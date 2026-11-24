const scenarios = {
  industrial: {
    name: 'Industrial Quality Control',
    category: 'Manufacturing Automation',
    description: 'Precision robotic torque verification and assembly stage clearance.',
    states: {
      trusted: {
        status: 'Trusted',
        tone: 'green',
        summary: 'All safety constraints satisfied. Production stage clearance granted.',
        facts: [
          'Bolt Torque: 42.5 Nm (Permitted range: 40.0 - 45.0 Nm)',
          'Thermal Sensor: 38.2 C (Safe limit: < 65.0 C)',
          'Calibration Certificate: Active (Verified 3 days ago)',
        ],
        constraint: 'Constraint: torque_in_range && temp_normal && cert_valid',
        evidence: 'Evidence trail: All 3 mandatory quality facts present, verified within tolerance, and mutually consistent.',
      },
      undetermined: {
        status: 'Undetermined',
        tone: 'amber',
        summary: 'Incomplete inspection record. The engine halts clearance instead of guessing.',
        facts: [
          'Bolt Torque: 42.5 Nm (Permitted range: 40.0 - 45.0 Nm)',
          'Thermal Sensor: 38.2 C (Safe limit: < 65.0 C)',
          'Calibration Certificate: MISSING / EXPIRED',
        ],
        constraint: 'Constraint: torque_in_range && temp_normal && cert_valid',
        evidence: 'Evidence trail: Calibration fact is missing. Deterministic logic halts execution with Undetermined status to prevent uncalibrated assembly.',
      },
      refuted: {
        status: 'Refuted',
        tone: 'red',
        summary: 'Physical tolerance violated. Assembly stage rejected immediately.',
        facts: [
          'Bolt Torque: 53.1 Nm (Permitted range: 40.0 - 45.0 Nm -> EXCEEDED)',
          'Thermal Sensor: 41.0 C (Safe limit: < 65.0 C)',
          'Calibration Certificate: Active',
        ],
        constraint: 'Constraint: torque_in_range && temp_normal && cert_valid',
        evidence: 'Evidence trail: Fact [Torque: 53.1 Nm] directly refutes constraint requirement [Max Torque: 45.0 Nm]. Part rejected.',
      },
      inconsistent: {
        status: 'Inconsistent',
        tone: 'red',
        summary: 'Hardware sensor conflict detected. Possible telemetry fault.',
        facts: [
          'Primary Pressure Sensor: 6.2 bar (Normal)',
          'Secondary Pressure Sensor: 0.1 bar (Zero pressure alert)',
          'Line Valve Status: Confirmed Open',
        ],
        constraint: 'Constraint: abs(primary_pressure - secondary_pressure) < 0.5 bar',
        evidence: 'Evidence trail: Sensor A and Sensor B provide contradictory readings on the same line. Failsafe alert triggered for sensor maintenance.',
      },
    },
  },
  medical: {
    name: 'Clinical Order Verification',
    category: 'Healthcare Decision Support',
    description: 'Pediatric medication dosage verification and contraindication detection.',
    states: {
      trusted: {
        status: 'Trusted',
        tone: 'green',
        summary: 'Prescription passed all clinical rules and allergy screening.',
        facts: [
          'Patient Age: 28 years (Adult)',
          'Prescribed Drug: Amoxicillin 500mg',
          'Documented Allergies: None recorded',
          'Renal Function Clearance: 95 mL/min (Normal)',
        ],
        constraint: 'Constraint: no_known_allergy && renal_adequate && dose_within_limits',
        evidence: 'Evidence trail: Dosage is within standard clinical range; no contraindications detected in patient health records.',
      },
      undetermined: {
        status: 'Undetermined',
        tone: 'amber',
        summary: 'Critical lab result absent. Engine alerts clinician for mandatory test.',
        facts: [
          'Patient Age: 65 years',
          'Prescribed Drug: Gentamicin (Nephrotoxic potential)',
          'Recent Serum Creatinine: Not recorded in past 7 days',
        ],
        constraint: 'Constraint: serum_creatinine_tested_recently && eGFR_evaluated',
        evidence: 'Evidence trail: Recent renal function reading is absent. Engine refuses to infer kidney safety and returns Undetermined.',
      },
      refuted: {
        status: 'Refuted',
        tone: 'red',
        summary: 'Direct clinical contraindication detected. Order blocked.',
        facts: [
          'Patient Age: 7 years (Pediatric)',
          'Prescribed Drug: Ciprofloxacin Oral',
          'Clinical Indication: Uncomplicated ear infection',
        ],
        constraint: 'Constraint: age >= 18 || specialist_pediatric_exception',
        evidence: 'Evidence trail: Pediatric guideline strictly refutes fluoroquinolone prescription for age < 18 without specialist exception.',
      },
      inconsistent: {
        status: 'Inconsistent',
        tone: 'red',
        summary: 'Conflicting medical chart records detected.',
        facts: [
          'Chart A Record: Patient has documented penicillin anaphylaxis history',
          'Chart B Record: Penicillin listed as currently tolerated medication',
        ],
        constraint: 'Constraint: consistent_allergy_history(patient_id)',
        evidence: 'Evidence trail: Anaphylaxis risk records conflict across electronic chart feeds. Requires urgent clinical record reconciliation.',
      },
    },
  },
  compliance: {
    name: 'Financial & Trade Compliance',
    category: 'Financial Operations',
    description: 'Cross-border payment validation, sanction screening, and dual-use goods checks.',
    states: {
      trusted: {
        status: 'Trusted',
        tone: 'green',
        summary: 'Payment transaction cleared against all active international lists.',
        facts: [
          'Remitter Entity: Verified Corporate Account (KYC Level 3)',
          'Beneficiary Jurisdiction: Switzerland (Low-risk zone)',
          'Sanction Screening: Zero matching entities across 14 international lists',
        ],
        constraint: 'Constraint: kyc_level >= 2 && jurisdiction_allowed && zero_sanctions',
        evidence: 'Evidence trail: Full verification trace cleared; remittance adheres to regulatory reporting thresholds.',
      },
      undetermined: {
        status: 'Undetermined',
        tone: 'amber',
        summary: 'Ultimate Beneficial Owner (UBO) information pending confirmation.',
        facts: [
          'Remitter Entity: Holding Corp Ltd',
          'Transaction Amount: $450,000 USD',
          'UBO Verification Document: In transit / Unconfirmed registry lookup',
        ],
        constraint: 'Constraint: ubo_registry_verified && identity_unmasked',
        evidence: 'Evidence trail: Deterministic compliance policy requires verified UBO before high-value clearance. Escalated for verification.',
      },
      refuted: {
        status: 'Refuted',
        tone: 'red',
        summary: 'Sanctioned entity match detected. Immediate transaction freeze.',
        facts: [
          'Beneficiary Vessel: IMO 9123456 (Specially Designated Nationals list match)',
          'Destination Port: Restricted trade zone',
        ],
        constraint: 'Constraint: not_on_sdn_list && permitted_shipping_destination',
        evidence: 'Evidence trail: Vessel IMO identifier directly matches active international sanction list. Clearance denied by rule.',
      },
      inconsistent: {
        status: 'Inconsistent',
        tone: 'red',
        summary: 'Contradictory trade manifest documents received.',
        facts: [
          'Commercial Invoice Country of Origin: Country Alpha',
          'Bill of Lading Loading Port: Country Beta (Disputed transshipment point)',
          'Customs Certificate of Origin: Country Gamma',
        ],
        constraint: 'Constraint: invoice_origin == bl_origin == certificate_origin',
        evidence: 'Evidence trail: Cargo documentation declares three mutually conflicting origins. Flagged for customs inspection.',
      },
    },
  },
  safety: {
    name: 'Autonomous Power & Safety Interlock',
    category: 'Energy & Critical Infrastructure',
    description: 'Substation circuit breaker interlocking and automated isolation protocols.',
    states: {
      trusted: {
        status: 'Trusted',
        tone: 'green',
        summary: 'Switchgear interlock sequence verified safe for energization.',
        facts: [
          'Earthing Switch ES-101: Confirmed Disengaged (Open)',
          'Busbar Voltage: 0.0 kV (De-energized verification complete)',
          'Transformer Isolator: Closed and mechanically locked',
        ],
        constraint: 'Constraint: earthing_switch_open && busbar_dead && isolator_locked',
        evidence: 'Evidence trail: All 3 electrical interlock safety rules verified. Feeder energization command permitted.',
      },
      undetermined: {
        status: 'Undetermined',
        tone: 'amber',
        summary: 'Auxiliary switch contact feedback delayed. Switchgear locked out.',
        facts: [
          'Command: Open Circuit Breaker CB-204',
          'Breaker Main Contact: Sensed Open',
          'Auxiliary Contact Telemetry: No response within 20ms timeout window',
        ],
        constraint: 'Constraint: main_contact_open && aux_contact_open',
        evidence: 'Evidence trail: Auxiliary contact state uncertain. Engine halts subsequent recloser sequence to protect human operators.',
      },
      refuted: {
        status: 'Refuted',
        tone: 'red',
        summary: 'Critical electrical hazard. Close command inhibited.',
        facts: [
          'Requested Action: Close Circuit Breaker CB-102',
          'Earthing Switch ES-102: ENGAGED (Ground switch is currently closed)',
        ],
        constraint: 'Constraint: earthing_switch_open == true',
        evidence: 'Evidence trail: Direct short-to-ground risk. Attempting to energize while ground switch is closed is refuting electrical safety rule.',
      },
      inconsistent: {
        status: 'Inconsistent',
        tone: 'red',
        summary: 'Dual redundant protective relays report opposing line states.',
        facts: [
          'Protective Relay Alpha: Line Impedance Normal (Healthy transmission)',
          'Protective Relay Beta: Severe Phase-to-Ground Fault detected (Trip requested)',
        ],
        constraint: 'Constraint: relay_alpha_state == relay_beta_state',
        evidence: 'Evidence trail: Dual safety controllers in direct disagreement. Failsafe emergency standby triggered for diagnostic check.',
      },
    },
  },
};

const integrationModes = {
  local: {
    title: 'Embedded Edge Integration (In-Process SDK)',
    badge: 'Zero Network Dependency · Ultra-Low Latency',
    network: '0 ms (Fully Offline)',
    data: '100% on-device (Zero data egress / No external upload)',
    path: 'Direct in-process call (C / Rust / WebAssembly / Python bindings)',
    cost: 'Minimal CPU usage (< 5% single-core during peak)',
    latency: '< 0.5 ms deterministic decision time',
    reliability: '100% autonomous operation during network outage',
  },
  cloud: {
    title: 'Traditional Cloud API Service',
    badge: 'High Latency · Variable Network Risk',
    network: '80 - 350 ms (WAN Round-Trip Dependency)',
    data: 'Transmitted over public network to remote cloud servers',
    path: 'Remote HTTPS REST / gRPC call through multiple network hops',
    cost: 'High recurring API request fees and network bandwidth charges',
    latency: 'Unpredictable (Subject to network jitter and queue delays)',
    reliability: 'Service unavailable if edge gateway loses internet connection',
  },
};

const benchmarkRows = [
  { queries: 100, cpu: 0.475, qps: 2103, memory: '4.2 MB', stability: '±0.04 ms' },
  { queries: 1000, cpu: 0.474, qps: 2109, memory: '4.3 MB', stability: '±0.03 ms' },
  { queries: 10000, cpu: 0.515, qps: 1941, memory: '4.8 MB', stability: '±0.06 ms' },
  { queries: 50000, cpu: 0.444, qps: 2254, memory: '5.1 MB', stability: '±0.05 ms' },
];

let activeScenarioKey = 'industrial';
let activeStateKey = 'trusted';
let activeBenchmarkMetric = 'cpu';

function renderScenarioSelector() {
  const container = document.getElementById('scenario-nav');
  if (!container) return;
  container.replaceChildren(
    ...Object.entries(scenarios).map(([key, item]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `scenario-pill ${key === activeScenarioKey ? 'is-active' : ''}`;
      btn.innerHTML = `<strong>${item.name}</strong><small>${item.category}</small>`;
      btn.addEventListener('click', () => {
        activeScenarioKey = key;
        renderScenarioSelector();
        renderDecision(activeStateKey);
      });
      return btn;
    })
  );
}

function renderDecision(stateKey) {
  activeStateKey = stateKey;
  const scenario = scenarios[activeScenarioKey];
  const item = scenario.states[stateKey];
  if (!item) return;

  document.querySelectorAll('.state-button').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.state === stateKey);
  });

  const scenarioDesc = document.getElementById('scenario-desc');
  if (scenarioDesc) {
    scenarioDesc.textContent = `${scenario.name}: ${scenario.description}`;
  }

  const statusEl = document.getElementById('decision-status');
  statusEl.textContent = item.status;
  statusEl.dataset.tone = item.tone;

  document.getElementById('decision-summary').textContent = item.summary;

  const factsList = document.getElementById('decision-facts');
  if (factsList) {
    factsList.replaceChildren(
      ...item.facts.map((factText) => {
        const li = document.createElement('li');
        li.textContent = factText;
        return li;
      })
    );
  }

  const constraintEl = document.getElementById('decision-constraint');
  if (constraintEl) {
    constraintEl.textContent = item.constraint;
  }

  document.getElementById('decision-evidence').textContent = item.evidence;
}

function renderMode(key) {
  const item = integrationModes[key];
  if (!item) return;

  document.querySelectorAll('.mode-button[data-mode]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.mode === key);
  });

  document.getElementById('mode-title').textContent = item.title;
  const badgeEl = document.getElementById('mode-badge');
  if (badgeEl) badgeEl.textContent = item.badge;

  document.getElementById('mode-network').textContent = item.network;
  document.getElementById('mode-data').textContent = item.data;
  document.getElementById('mode-path').textContent = item.path;
  document.getElementById('mode-cost').textContent = item.cost;

  const latencyEl = document.getElementById('mode-latency');
  if (latencyEl) latencyEl.textContent = item.latency;

  const reliabilityEl = document.getElementById('mode-reliability');
  if (reliabilityEl) reliabilityEl.textContent = item.reliability;
}

function renderBenchmark(metric) {
  activeBenchmarkMetric = metric;
  document.querySelectorAll('.mode-button[data-metric]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.metric === metric);
  });

  const chart = document.getElementById('chart');
  if (!chart) return;

  const field = metric === 'cpu' ? 'cpu' : 'qps';
  const unit = metric === 'cpu' ? ' ms' : ' decisions/s';
  const values = benchmarkRows.map((row) => row[field]);
  const min = Math.min(...values);
  const max = Math.max(...values);

  chart.replaceChildren(
    ...benchmarkRows.map((row) => {
      const card = document.createElement('div');
      card.className = 'benchmark-col';

      const label = document.createElement('div');
      label.className = 'col-label';
      label.textContent = `${row.queries.toLocaleString('en-US')} queries`;

      const barContainer = document.createElement('div');
      barContainer.className = 'bar';

      const valLabel = document.createElement('span');
      valLabel.className = 'bar-value';
      valLabel.textContent = `${row[field]}${unit}`;

      const fill = document.createElement('span');
      fill.className = 'bar-fill';
      const ratio = max === min ? 0.8 : 0.4 + ((row[field] - min) / (max - min)) * 0.55;
      fill.style.height = `${Math.round(ratio * 100)}%`;

      barContainer.append(valLabel, fill);
      card.append(barContainer, label);
      return card;
    })
  );
}

function updateEdgeSimulator() {
  const decisionsPerSec = Number(document.getElementById('sim-qps').value);
  const edgeNodes = Number(document.getElementById('sim-nodes').value);

  document.getElementById('sim-qps-value').textContent = `${decisionsPerSec.toLocaleString('en-US')} /sec`;
  document.getElementById('sim-nodes-value').textContent = `${edgeNodes} gateway nodes`;

  const totalDecisionsPerSec = decisionsPerSec * edgeNodes;
  const localLatencyMs = 0.47;
  const cloudLatencyMs = 125.0;

  const latencyDiffRatio = Math.round(cloudLatencyMs / localLatencyMs);
  const dailyTotalDecisions = totalDecisionsPerSec * 86400;
  const cloudBandwidthGbDay = ((dailyTotalDecisions * 1.5) / (1024 * 1024)).toFixed(1);

  const localLatencyEl = document.getElementById('sim-res-local-latency');
  if (localLatencyEl) localLatencyEl.textContent = `0.47 ms (Deterministic)`;

  const cloudLatencyEl = document.getElementById('sim-res-cloud-latency');
  if (cloudLatencyEl) cloudLatencyEl.textContent = `~125.0 ms (${latencyDiffRatio}x slower)`;

  const bandwidthEl = document.getElementById('sim-res-bandwidth');
  if (bandwidthEl) bandwidthEl.textContent = `0 KB egress vs ~${cloudBandwidthGbDay} GB / day cloud transit`;

  const offlineStatusEl = document.getElementById('sim-res-offline');
  if (offlineStatusEl) offlineStatusEl.textContent = '100% Autonomous (Zero outage risk)';
}

function initEventHandlers() {
  document.querySelectorAll('.state-button').forEach((button) => {
    button.addEventListener('click', () => renderDecision(button.dataset.state));
  });

  document.querySelectorAll('.mode-button[data-mode]').forEach((button) => {
    button.addEventListener('click', () => renderMode(button.dataset.mode));
  });

  document.querySelectorAll('.mode-button[data-metric]').forEach((button) => {
    button.addEventListener('click', () => renderBenchmark(button.dataset.metric));
  });

  const simQps = document.getElementById('sim-qps');
  const simNodes = document.getElementById('sim-nodes');
  if (simQps && simNodes) {
    simQps.addEventListener('input', updateEdgeSimulator);
    simNodes.addEventListener('input', updateEdgeSimulator);
  }
}

renderScenarioSelector();
renderDecision('trusted');
renderMode('local');
renderBenchmark('cpu');
updateEdgeSimulator();
initEventHandlers();
