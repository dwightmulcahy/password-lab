(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const passwordRow = document.querySelector(".password-row");
    const generatorToggle = document.getElementById("generatorToggle");
    const generatorPanel = document.getElementById("generatorPanel");

    if (passwordRow && generatorToggle && generatorPanel && !document.getElementById("generatorToolsRow")) {
      const toolsRow = document.createElement("div");
      toolsRow.id = "generatorToolsRow";
      toolsRow.className = "generator-tools-row";
      passwordRow.insertAdjacentElement("afterend", toolsRow);
      toolsRow.append(generatorToggle, generatorPanel);
    }

    const strengthLine = document.querySelector(".strength-line");
    const scoreText = document.getElementById("scoreText");
    const scoreWhy = document.getElementById("scoreWhy");

    if (strengthLine && scoreText && scoreWhy && !document.getElementById("scoreWithExplanation")) {
      const scoreGroup = document.createElement("div");
      scoreGroup.id = "scoreWithExplanation";
      scoreGroup.className = "score-with-explanation";
      scoreText.replaceWith(scoreGroup);
      scoreWhy.classList.add("score-why-inline");
      scoreGroup.append(scoreText, scoreWhy);
    }
  });
})();
