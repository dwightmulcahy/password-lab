import { ZxcvbnFactory } from '@zxcvbn-ts/core';
import * as common from '@zxcvbn-ts/language-common';
import * as en from '@zxcvbn-ts/language-en';
import * as es from '@zxcvbn-ts/language-es-es';
import * as pt from '@zxcvbn-ts/language-pt-br';
import * as fr from '@zxcvbn-ts/language-fr';
import * as de from '@zxcvbn-ts/language-de';

const makeOptions = (lang) => ({
  translations: lang.translations,
  graphs: common.adjacencyGraphs,
  dictionary: {...common.dictionary, ...lang.dictionary}
});

window.OFFLINE_BUILD = true;
window.passwordEstimators = {
  en: new ZxcvbnFactory(makeOptions(en)),
  es: new ZxcvbnFactory(makeOptions(es)),
  pt: new ZxcvbnFactory(makeOptions(pt)),
  fr: new ZxcvbnFactory(makeOptions(fr)),
  de: new ZxcvbnFactory(makeOptions(de))
};
window.zxcvbnPackageInfo = {
  status: 'fallback',
  versions: {core:'4.2.0',common:'4.1.3',en:'4.1.1',es:'4.1.2',pt:'4.1.1',fr:'4.1.2',de:'4.1.1'},
  published: {}
};
const saved = localStorage.getItem('passwordStrengthLanguage');
window.passwordEstimator = window.passwordEstimators[saved] || window.passwordEstimators.en;
window.dispatchEvent(new Event('password-estimator-ready'));
