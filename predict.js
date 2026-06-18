const predictDate = document.getElementById("predictDate");
const predictMatch = document.getElementById("predictMatch");
const runPrediction = document.getElementById("runPrediction");
const predictResult = document.getElementById("predictResult");

function getQuery(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function matchesForDate(date) {
  return window.WORLD_CUP_FIXTURES
    .filter((match) => match.date === date)
    .sort((a, b) => (a.kickoffTime || "").localeCompare(b.kickoffTime || "") || a.home.localeCompare(b.home, "zh-CN"));
}

function renderMatchOptions() {
  const matches = matchesForDate(predictDate.value);
  predictMatch.innerHTML = matches.length
    ? matches.map((match) => `<option value="${match.id}">${match.kickoffTime || match.date} · ${match.home} vs ${match.away}</option>`).join("")
    : `<option value="">当前日期没有本地赛程，请等待后台同步或调整日期</option>`;
  runPrediction.disabled = !matches.length;
}

function selectedMatch() {
  return window.WORLD_CUP_FIXTURES.find((match) => match.id === predictMatch.value);
}

async function generatePrediction() {
  const match = selectedMatch();
  if (!match) return;
  runPrediction.disabled = true;
  runPrediction.textContent = "生成中";
  predictResult.textContent = "正在整理比赛、球队、球员和分析技能输入...";
  try {
    const response = await fetch("/api/predict", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ match })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    predictResult.textContent = payload.mode === "prompt-only"
      ? `${payload.warning}\n\n${payload.prompt}`
      : JSON.stringify(payload.saved || payload.result, null, 2);
  } catch (error) {
    predictResult.textContent = `预测失败：${error.message}`;
  } finally {
    runPrediction.disabled = false;
    runPrediction.textContent = "生成预测";
  }
}

predictDate.addEventListener("change", renderMatchOptions);
runPrediction.addEventListener("click", generatePrediction);

const matchId = getQuery("match");
const initial = window.WORLD_CUP_FIXTURES.find((match) => match.id === matchId);
if (initial) predictDate.value = initial.date;
renderMatchOptions();
if (initial) predictMatch.value = initial.id;
