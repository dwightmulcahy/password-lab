import { execFileSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';

const [tagArg, outputPath = 'release-notes.md'] = process.argv.slice(2);

if (!tagArg) {
  console.error('Usage: node tools/release-notes.mjs <M.m.p|vM.m.p> [output.md]');
  process.exit(2);
}

function parseVersion(tag) {
  const match = String(tag).trim().match(/^v?(\d+)\.(\d+)\.(\d+)$/);
  if (!match) return null;
  return match.slice(1).map(Number);
}

function compareVersions(a, b) {
  for (let index = 0; index < 3; index += 1) {
    if (a[index] !== b[index]) return a[index] - b[index];
  }
  return 0;
}

const currentVersion = parseVersion(tagArg);
if (!currentVersion) {
  console.error(`Release tag must be stable semantic version M.m.p or vM.m.p; got ${tagArg}`);
  process.exit(2);
}

const mergedTags = execFileSync('git', ['tag', '--merged', 'HEAD'], { encoding: 'utf8' })
  .split(/\r?\n/)
  .map(tag => tag.trim())
  .filter(Boolean);

const previous = mergedTags
  .map(tag => ({ tag, version: parseVersion(tag) }))
  .filter(item => item.version && compareVersions(item.version, currentVersion) < 0)
  .sort((a, b) => compareVersions(b.version, a.version))[0]?.tag ?? null;

const range = previous ? `${previous}..HEAD` : 'HEAD';
const log = execFileSync(
  'git',
  ['log', '--no-merges', '--format=%H%x1f%s%x1f%b%x1e', range],
  { encoding: 'utf8' },
);

const commits = log
  .split('\x1e')
  .map(record => record.trim())
  .filter(Boolean)
  .map(record => {
    const [sha = '', subject = '', body = ''] = record.split('\x1f');
    return { sha: sha.trim(), subject: subject.trim(), body: body.trim() };
  });

const groups = [
  ['feat', '✨ Features'],
  ['fix', '🐛 Fixes'],
  ['perf', '⚡ Performance'],
  ['security', '🔒 Security'],
  ['refactor', '♻️ Refactoring'],
  ['docs', '📝 Documentation'],
  ['test', '✅ Tests'],
  ['build', '📦 Build'],
  ['ci', '👷 CI'],
  ['style', '🎨 Styles'],
  ['revert', '⏪ Reverts'],
  ['chore', '🧹 Chores'],
];

const conventional = new Map(groups.map(([type]) => [type, []]));
const otherConventional = [];
const breaking = [];
const other = [];

function itemLine(commit, parsed) {
  const repo = process.env.GITHUB_REPOSITORY;
  const shortSha = commit.sha.slice(0, 7);
  const scope = parsed?.scope ? `**${parsed.scope}:** ` : '';
  const marker = parsed?.breaking ? ' **BREAKING**' : '';
  const text = `${scope}${parsed?.description ?? commit.subject}${marker}`;
  if (!repo) return `- ${text} (${shortSha})`;
  return `- ${text} ([${shortSha}](https://github.com/${repo}/commit/${commit.sha}))`;
}

for (const commit of commits) {
  const match = commit.subject.match(/^([a-zA-Z][\w-]*)(?:\(([^)]+)\))?(!)?:\s+(.+)$/);
  if (!match) {
    other.push({ commit, line: itemLine(commit, null) });
    continue;
  }

  const parsed = {
    type: match[1].toLowerCase(),
    scope: match[2] || '',
    breaking: Boolean(match[3]) || /^BREAKING(?: |-)?CHANGE:/m.test(commit.body),
    description: match[4],
  };
  const entry = { commit, parsed, line: itemLine(commit, parsed) };

  if (parsed.breaking) {
    breaking.push(entry);
    continue;
  }
  if (conventional.has(parsed.type)) conventional.get(parsed.type).push(entry);
  else otherConventional.push(entry);
}

const lines = ['## What\'s Changed', ''];

if (previous) {
  lines.push(`Changes since **${previous}**.`, '');
}

if (breaking.length) {
  lines.push('### ⚠️ Breaking Changes', ...breaking.map(entry => entry.line), '');
}

for (const [type, heading] of groups) {
  const entries = conventional.get(type);
  if (!entries.length) continue;
  lines.push(`### ${heading}`, ...entries.map(entry => entry.line), '');
}

if (otherConventional.length) {
  lines.push('### 🔧 Other Conventional Changes', ...otherConventional.map(entry => entry.line), '');
}

if (other.length) {
  lines.push('### Other Changes', ...other.map(entry => entry.line), '');
}

if (!commits.length) {
  lines.push('No commits were found for this release.', '');
}

if (previous && process.env.GITHUB_REPOSITORY) {
  lines.push(
    `**Full Changelog:** https://github.com/${process.env.GITHUB_REPOSITORY}/compare/${previous}...${tagArg}`,
    '',
  );
}

await writeFile(outputPath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
console.log(`Release notes written to ${outputPath} (${commits.length} commits${previous ? ` since ${previous}` : ''}).`);
