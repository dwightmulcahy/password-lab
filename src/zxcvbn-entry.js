import { ZxcvbnFactory } from '@zxcvbn-ts/core';
import * as common from '@zxcvbn-ts/language-common';
import * as en from '@zxcvbn-ts/language-en';
import * as es from '@zxcvbn-ts/language-es-es';
import * as pt from '@zxcvbn-ts/language-pt-br';
import * as fr from '@zxcvbn-ts/language-fr';
import * as de from '@zxcvbn-ts/language-de';

const VERSIONS = Object.freeze({
  core: '4.2.0',
  common: '4.1.3',
  en: '4.1.1',
  es: '4.1.2',
  pt: '4.1.1',
  fr: '4.1.2',
  de: '4.1.1',
});

const makeOptions = (lang) => ({
  translations: lang.translations,
  graphs: common.adjacencyGraphs,
  dictionary: { ...common.dictionary, ...lang.dictionary },
});

function safeStorageGet(key) {
  try { return window.localStorage?.getItem(key) ?? null; }
  catch { return null; }
}

function detectLanguage() {
  let urlLanguage = null;
  try { urlLanguage = new URLSearchParams(window.location.search).get('lang'); } catch {}
  if (['en', 'es', 'pt', 'fr', 'de'].includes(urlLanguage)) return urlLanguage;

  const saved = safeStorageGet('passwordStrengthLanguage');
  if (['en', 'es', 'pt', 'fr', 'de'].includes(saved)) return saved;

  const langs = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || 'en'];
  for (const raw of langs) {
    const lang = String(raw).toLowerCase();
    if (lang.startsWith('es')) return 'es';
    if (lang.startsWith('pt')) return 'pt';
    if (lang.startsWith('fr')) return 'fr';
    if (lang.startsWith('de')) return 'de';
    if (lang.startsWith('en')) return 'en';
  }
  return 'en';
}

window.OFFLINE_BUILD = true;
window.passwordEstimators = {
  en: new ZxcvbnFactory(makeOptions(en)),
  es: new ZxcvbnFactory(makeOptions(es)),
  pt: new ZxcvbnFactory(makeOptions(pt)),
  fr: new ZxcvbnFactory(makeOptions(fr)),
  de: new ZxcvbnFactory(makeOptions(de)),
};
window.zxcvbnPackageInfo = {
  status: 'bundled',
  versions: VERSIONS,
  published: {},
};
window.passwordEstimator = window.passwordEstimators[detectLanguage()] || window.passwordEstimators.en;
window.dispatchEvent(new Event('password-estimator-ready'));
