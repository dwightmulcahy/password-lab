(() => {
  const SEMANTIC_CLASSES = [
    'semantic-danger',
    'semantic-caution',
    'semantic-warning',
    'semantic-info',
    'semantic-success',
    'semantic-pending',
    'semantic-breached'
  ];
  const SCORE_STATES = ['semantic-danger','semantic-caution','semantic-warning','semantic-info','semantic-success'];

  function clearSemanticClasses(element) {
    if (!element) return;
    element.classList.remove(...SEMANTIC_CLASSES);
  }

  function addSemanticClass(elements, className) {
    for (const element of elements) {
      clearSemanticClasses(element);
      if (element && className) element.classList.add(className);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const password = document.getElementById('password');
    const hero = document.querySelector('.hero-card');
    const strengthLabel = document.getElementById('strengthLabel');
    const scoreText = document.getElementById('scoreText');
    const meterFill = document.getElementById('meterFill');
    const breachStatus = document.getElementById('breachStatus');
    const detectedCard = document.querySelector('.detected-card');

    if (!hero || !strengthLabel || !scoreText || !meterFill) return;

    function updateSemanticState() {
      const breachFound = breachStatus?.classList.contains('bad');
      const breachClean = breachStatus?.classList.contains('good');
      const scoreMatch = scoreText.textContent.match(/([0-4])\s*\/\s*4/);

      if (breachFound) {
        addSemanticClass([hero, strengthLabel, meterFill], 'semantic-danger');
        hero.classList.add('semantic-breached');
      } else if (scoreMatch) {
        const score = Number(scoreMatch[1]);
        addSemanticClass([hero, strengthLabel, meterFill], SCORE_STATES[score]);
      } else if (password?.value) {
        addSemanticClass([hero, strengthLabel], 'semantic-pending');
        clearSemanticClasses(meterFill);
      } else {
        addSemanticClass([hero, strengthLabel, meterFill], null);
      }

      if (detectedCard) {
        detectedCard.classList.remove('semantic-danger','semantic-success');
        if (breachFound) detectedCard.classList.add('semantic-danger');
        else if (breachClean) detectedCard.classList.add('semantic-success');
      }
    }

    const observer = new MutationObserver(updateSemanticState);
    observer.observe(scoreText, { childList: true, characterData: true, subtree: true });
    observer.observe(strengthLabel, { childList: true, characterData: true, subtree: true });
    if (breachStatus) observer.observe(breachStatus, { attributes: true, childList: true, characterData: true, subtree: true });
    password?.addEventListener('input', updateSemanticState);

    updateSemanticState();
  });
})();
