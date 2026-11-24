const decisionContent = {
  trusted: {
    status: 'Trusted',
    tone: 'green',
    summary: 'The supplied facts pass the published rule check.',
    evidence: 'Evidence: matching facts are present and consistent.',
  },
  undetermined: {
    status: 'Undetermined',
    tone: 'amber',
    summary: 'The engine does not guess when evidence is incomplete.',
    evidence: 'Evidence: one required fact is not available.',
  },
  refuted: {
    status: 'Refuted',
    tone: 'red',
    summary: 'The supplied facts do not support the proposed result.',
    evidence: 'Evidence: a supplied fact contradicts the proposed result.',
  },
  inconsistent: {
    status: 'Inconsistent',
    tone: 'red',
    summary: 'The supplied facts conflict with each other.',
    evidence: 'Evidence: two supplied facts cannot both be true.',
  },
};

const modeContent = {
  local: {
    title: 'Local engine',
    network: 'Not required',
    data: 'On the edge device',
    path: 'Local call inside the system',
    cost: 'Device resource use',
  },
  cloud: {
    title: 'Cloud call',
    network: 'Required',
    data: 'Sent to a remote service',
    path: 'Remote call through a network',
    cost: 'Service call and transfer use',
  },
};

const benchmarkRows = [
  { queries: 100, cpu: 0.475, qps: 2103 },
  { queries: 1000, cpu: 0.474, qps: 2109 },
  { queries: 10000, cpu: 0.515, qps: 1941 },
  { queries: 50000, cpu: 0.444, qps: 2254 },
];

function renderDecision(key) {
  const item = decisionContent[key];
  if (!item) return;
  document.querySelectorAll('.state-button').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.state === key);
  });
  const status = document.getElementById('decision-status');
  status.textContent = item.status;
  status.dataset.tone = item.tone;
  document.getElementById('decision-summary').textContent = item.summary;
  document.getElementById('decision-evidence').textContent = item.evidence;
}

function renderMode(key) {
  const item = modeContent[key];
  if (!item) return;
  document.querySelectorAll('.mode-button[data-mode]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.mode === key);
  });
  document.getElementById('mode-title').textContent = item.title;
  document.getElementById('mode-network').textContent = item.network;
  document.getElementById('mode-data').textContent = item.data;
  document.getElementById('mode-path').textContent = item.path;
  document.getElementById('mode-cost').textContent = item.cost;
}

function renderBenchmark(metric) {
  document.querySelectorAll('.mode-button[data-metric]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.metric === metric);
  });
  const field = metric === 'cpu' ? 'cpu' : 'qps';
  const values = benchmarkRows.map((row) => row[field]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const chart = document.getElementById('chart');
  chart.replaceChildren(
    ...benchmarkRows.map((row) => {
      const item = document.createElement('div');
      item.className = 'bar';
      item.title = `${row.queries.toLocaleString('en-US')}: ${row[field]}`;
      const fill = document.createElement('span');
      const ratio = max === min ? 1 : 0.35 + ((row[field] - min) / (max - min)) * 0.65;
      fill.style.height = `${Math.round(ratio * 100)}%`;
      item.append(fill);
      return item;
    }),
  );
}

function renderConstraints() {
  const scale = Number(document.getElementById('scale').value);
  const devices = Number(document.getElementById('devices').value);
  document.getElementById('scale-value').textContent = scale.toLocaleString('en-US');
  document.getElementById('devices-value').textContent = `${devices} units`;

  const feasible = scale <= 360000 && devices <= 12;
  const status = document.getElementById('constraint-status');
  status.textContent = feasible ? 'Feasible plan' : 'No feasible plan';
  status.dataset.tone = feasible ? 'green' : 'amber';
  document.getElementById('constraint-summary').textContent = feasible
    ? 'A feasible plan is available under these public snapshot limits.'
    : 'No feasible plan appears under these public snapshot limits.';
}

document.querySelectorAll('.state-button').forEach((button) => {
  button.addEventListener('click', () => renderDecision(button.dataset.state));
});

document.querySelectorAll('.mode-button[data-mode]').forEach((button) => {
  button.addEventListener('click', () => renderMode(button.dataset.mode));
});

document.querySelectorAll('.mode-button[data-metric]').forEach((button) => {
  button.addEventListener('click', () => renderBenchmark(button.dataset.metric));
});

document.getElementById('scale').addEventListener('input', renderConstraints);
document.getElementById('devices').addEventListener('input', renderConstraints);

renderDecision('trusted');
renderMode('local');
renderBenchmark('cpu');
renderConstraints();
