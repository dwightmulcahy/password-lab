import { readFile, writeFile } from 'node:fs/promises';

const LIST_URL = 'https://github.com/stars/dwightmulcahy/lists/featured';
const OUTPUT_PATH = new URL('../assets/featured-projects.json', import.meta.url);
const MAX_PAGES = 10;

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function extractRepoRefs(html) {
  const refs = [];
  const seen = new Set();
  const patterns = [
    /<h3\b[^>]*>[\s\S]{0,1600}?<a\b[^>]*href="\/([^"\/?#]+)\/([^"\/?#]+)"/gi,
    /<a\b[^>]*class="[^"]*Link--primary[^"]*"[^>]*href="\/([^"\/?#]+)\/([^"\/?#]+)"/gi,
  ];

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const owner = decodeHtml(match[1]);
      const name = decodeHtml(match[2]);
      const key = `${owner}/${name}`.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        refs.push({ owner, name });
      }
    }
    if (refs.length) break;
  }
  return refs;
}

function extractNextPage(html, currentUrl) {
  const matches = [
    html.match(/<a\b[^>]*href="([^"]+)"[^>]*rel="next"/i),
    html.match(/<a\b[^>]*rel="next"[^>]*href="([^"]+)"/i),
  ];
  const href = matches.find(Boolean)?.[1];
  return href ? new URL(decodeHtml(href), currentUrl).href : null;
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: {
      'User-Agent': 'password-lab-featured-project-sync',
      ...options.headers,
    },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response.text();
}

async function fetchFeaturedRefs() {
  const refs = [];
  const seen = new Set();
  let url = LIST_URL;

  for (let page = 0; page < MAX_PAGES && url; page += 1) {
    const html = await fetchText(url);
    const pageRefs = extractRepoRefs(html);
    if (!pageRefs.length) throw new Error(`Could not find repositories on ${url}`);

    for (const ref of pageRefs) {
      const key = `${ref.owner}/${ref.name}`.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        refs.push(ref);
      }
    }
    url = extractNextPage(html, url);
  }

  if (!refs.length) throw new Error(`GitHub Featured list is empty: ${LIST_URL}`);
  return refs;
}

async function fetchRepoMetadata(ref) {
  const token = process.env.GITHUB_TOKEN?.trim();
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const text = await fetchText(`https://api.github.com/repos/${encodeURIComponent(ref.owner)}/${encodeURIComponent(ref.name)}`, { headers });
    const repo = JSON.parse(text);
    return {
      owner: repo.owner?.login || ref.owner,
      name: repo.name || ref.name,
      url: repo.html_url || `https://github.com/${ref.owner}/${ref.name}`,
      language: repo.language || '',
      description: repo.description || 'GitHub repository.',
    };
  } catch (error) {
    console.warn(`Featured-project metadata lookup failed for ${ref.owner}/${ref.name}: ${error.message}`);
    return {
      owner: ref.owner,
      name: ref.name,
      url: `https://github.com/${ref.owner}/${ref.name}`,
      language: '',
      description: 'GitHub repository.',
    };
  }
}

async function loadFallback() {
  const text = await readFile(OUTPUT_PATH, 'utf8');
  const projects = JSON.parse(text);
  if (!Array.isArray(projects) || !projects.length) throw new Error('Featured-project fallback is empty');
  return projects;
}

export async function syncFeaturedProjects() {
  try {
    const refs = await fetchFeaturedRefs();
    const projects = await Promise.all(refs.map(fetchRepoMetadata));
    await writeFile(OUTPUT_PATH, `${JSON.stringify(projects, null, 2)}\n`);
    console.log(`Synced ${projects.length} featured projects from ${LIST_URL}`);
    return projects;
  } catch (error) {
    if (process.env.FEATURED_PROJECTS_REQUIRE_LIVE === '1') throw error;
    const fallback = await loadFallback();
    console.warn(`Could not sync GitHub Featured list (${error.message}); using ${fallback.length}-project snapshot.`);
    return fallback;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await syncFeaturedProjects();
}
