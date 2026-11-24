# FlareMind — Deterministic Offline Decision Engine

[![License](https://img.shields.io/badge/License-Proprietary%20Evaluation-red.svg)](LICENSE.md)
[![Latency](https://img.shields.io/badge/Avg%20Latency-%3C%200.5ms-brightgreen.svg)](RESULTS.md)
[![Throughput](https://img.shields.io/badge/Single--Core%20QPS-2%2C100%2B-blue.svg)](RESULTS.md)
[![Zero Cloud Egress](https://img.shields.io/badge/Network-100%25%20Offline-success.svg)](#executive-summary--value-proposition)
[![Hallucination Rate](https://img.shields.io/badge/Hallucination%20Rate-0%25%20(Four--Valued%20Logic)-blueviolet.svg)](#four-valued-logic-architecture)

FlareMind is a high-performance, deterministic decision engine purpose-built for mission-critical edge computing. It evaluates multi-variable business and safety constraints in **under 0.5 milliseconds** on standard, commodity single-core CPUs. Operating entirely offline with four-valued mathematical logic, FlareMind delivers verifiable, audit-ready decisions with zero data egress, zero token costs, and zero hallucinations.

This repository serves as a **public demonstration package** showcasing the product's verified capabilities, interactive industry scenarios, and published benchmark performance. It strictly excludes proprietary solver source code, private algorithms, rule definitions, and confidential client data.

---

## Executive Summary & Value Proposition

Modern mission-critical systems (such as industrial robotics, medical bedside devices, power grid switchgear, and edge financial terminals) face a severe dilemma:

1. **Probabilistic Large Language Models (LLMs)** are non-deterministic, suffer from unpredictable hallucinations, introduce high network latency (300ms - 3,000ms), demand expensive cloud GPU infrastructure, and risk sensitive data leakage.
2. **Legacy Rule Engines** (e.g. Drools, Camunda) rely on heavy Java Virtual Machines (>500MB RAM), exhibit high startup latency, suffer from garbage-collection pauses, and are ill-suited for resource-constrained edge microcontrollers or gateway devices.

**FlareMind bridges this gap.** By executing compact, compiled constraint logic locally at the hardware edge, FlareMind provides sub-millisecond, provable guarantees with minimal hardware demands:

- **Sub-Millisecond Execution**: Average decision time of **0.47 ms** under 200 state nodes and 5 deduction levels.
- **Single-Core Efficiency**: Sustained throughput exceeding **2,100 decisions/second** on a single commodity CPU thread.
- **Four-Valued Mathematical Logic**: Explicitly resolves into `Trusted`, `Undetermined`, `Refuted`, or `Inconsistent`. FlareMind **never guesses** or hallucinates when evidence is incomplete.
- **100% Offline Edge Autonomy**: Zero network requests, zero cloud egress, and complete data sovereignty.
- **Minimal Resource Footprint**: Under **10 MB RAM** memory consumption without requiring GPUs or neural accelerators.

---

## Technical Comparison Matrix

| Capability Dimension | FlareMind Edge Engine | Cloud LLMs (e.g. GPT-4 / Claude) | Legacy Rule Engines |
| :--- | :--- | :--- | :--- |
| **Decision Determinism** | **100% Provable Certainty** (Mathematical constraint deduction) | Probabilistic (Subject to hallucinations and prompt drift) | Deterministic (Conditional production rules) |
| **Average Latency** | **&lt; 0.5 ms** (Zero network dependency, predictable jitter) | 300 ms &ndash; 3,000 ms (Network round-trip + GPU inference) | 10 ms &ndash; 80 ms (JVM execution + garbage collection pauses) |
| **Incomplete Information** | Returns explicit **`Undetermined`** state; halts execution safely | Guesses plausible-sounding answers (Hallucination risk) | Throws runtime null exceptions or falls back to defaults |
| **Conflicting Data** | Returns explicit **`Inconsistent`** state; flags telemetry error | Averages or arbitrarily selects one conflicting statement | Often fires unexpected conflicting rules simultaneously |
| **Hardware Demands** | **&lt; 10 MB RAM**, single CPU thread (x86-64 / ARM64) | Massive GPU clusters or persistent broadband connection | Heavy JVM environment (&gt; 500 MB RAM minimum) |
| **Auditability & Trace** | **Structured formal proof** generated for every single decision | Opaque black-box neural attention weights | Verbose unstructured execution logs |
| **Data Privacy** | **100% on-device**; zero data packets leave the edge unit | Transmits sensitive operational data to external clouds | Typically centralized in corporate relational databases |

---

## Four-Valued Logic Architecture

In high-consequence edge environments, boolean binary logic (`true` / `false`) is dangerously insufficient. When sensor feeds disconnect or data packets are delayed, forcing a binary decision leads either to false alarms or catastrophic failures.

FlareMind evaluates facts against constraints using a formal four-valued logic framework:

```
                  ┌─────────────────────────────────────────┐
                  │    Runtime Facts + Domain Constraints   │
                  └────────────────────┬────────────────────┘
                                       │
                         [ Constraint Deduction Check ]
                                       │
         ┌───────────────────┬─────────┴─────────┬───────────────────┐
         ▼                   ▼                   ▼                   ▼
    ┌─────────┐       ┌──────────────┐     ┌───────────┐     ┌──────────────┐
    │ Trusted │       │ Undetermined │     │  Refuted  │     │ Inconsistent │
    └─────────┘       └──────────────┘     └───────────┘     └──────────────┘
    All constraints   Evidence missing;    Violation found;  Conflicting facts;
    proven valid.     refuses to guess.    rejected cleanly. telemetry fault.
```

1. **`Trusted`**: All required facts are present, verified within valid thresholds, and mutually consistent. Safe to proceed.
2. **`Undetermined`**: One or more required evidentiary facts are absent. Instead of inventing values, the engine halts the critical action and requests missing data.
3. **`Refuted`**: One or more supplied facts directly violate active safety constraints. The operation is explicitly and immediately denied.
4. **`Inconsistent`**: Two or more supplied facts directly contradict each other (e.g. redundant sensors reporting opposing values). The engine flags a telemetry or hardware integrity failure.

---

## Published Benchmark Summary

Official benchmark evaluations conducted under controlled baseline conditions (200 state nodes, single CPU thread, deduction depth of 5 steps):

| Sample Evaluation Size | Average Decision Time | Single-Core Throughput | Memory Footprint | Latency Jitter |
| ---: | ---: | ---: | ---: | ---: |
| **100 queries** | 0.475 ms | 2,103 decisions/s | 4.2 MB | &plusmn;0.04 ms |
| **1,000 queries** | 0.474 ms | 2,109 decisions/s | 4.3 MB | &plusmn;0.03 ms |
| **10,000 queries** | 0.515 ms | 1,941 decisions/s | 4.8 MB | &plusmn;0.06 ms |
| **50,000 queries** | 0.444 ms | 2,254 decisions/s | 5.1 MB | &plusmn;0.05 ms |

### Key Benchmark Observations:
- **Flat Latency Scale Invariance**: Decision latency remains virtually identical between 100 queries (0.475 ms) and 50,000 queries (0.444 ms). This demonstrates constant-time scaling critical for real-time robotic and PLC control loops.
- **Negligible Memory Consumption**: Memory footprint stays under 6 MB throughout high-volume testing, preventing memory exhaustion on edge micro-gateways.

For in-depth methodology, test environment specifications, and latency distribution breakdowns, review [RESULTS.md](RESULTS.md).

---

## Target Industry Scenarios

FlareMind is engineered specifically for sectors where errors carry high operational, financial, or physical costs:

1. **Industrial Robotics & Assembly Clearance**: Real-time torque, temperature, and assembly sequencing verification directly on shop-floor PLCs.
2. **Clinical Decision Support**: Bedside drug interaction and pediatric contraindication screening operating securely within hospital firewalls.
3. **Financial & Trade Compliance**: Sub-millisecond transaction sanction screening and AML verification at edge payment terminals.
4. **Autonomous Power & Substation Interlocking**: Electrical safety switchgear interlocking preventing fatal switching sequences during line maintenance.
5. **Autonomous Drones & Edge Robotics**: Failsafe geofence adherence and navigation constraint verification during total communications blackout.
6. **Automotive ECU Telemetry Verification**: Deterministic sensor fusion checks ensuring steering and braking commands execute only on verified sensor telemetry.

---

## Integration Pathways

FlareMind supports two lightweight, zero-overhead edge integration modalities:

### 1. In-Process Embedded SDK
Embed the engine directly into host applications via native C/Rust bindings or WebAssembly runtime modules. Ideal for real-time robotics, embedded Linux controllers, and RTOS devices.

```javascript
// Conceptual SDK Client Contract
import { FlareMindEngine } from '@flaremind/edge-sdk';

const engine = FlareMindEngine.loadContext('./rules/safety-profile.bin');

const outcome = engine.evaluate({
  bolt_torque_nm: 42.5,
  operating_temp_c: 38.2,
  calibration_active: true
});

console.log(outcome.state);   // "TRUSTED"
console.log(outcome.elapsed); // 0.47 ms
console.log(outcome.trace);   // Structured audit trail
```

### 2. Local Micro-Daemon (Unix Domain Socket / Localhost HTTP)
Run FlareMind as a local lightweight service communicating through high-speed inter-process communication (IPC). Ideal for multi-process edge appliances and localized on-prem servers.

---

## Static Interactive Demonstration

To explore the product capabilities and run results without installing external dependencies, open the included static demo:

```bash
# Run using Python's built-in local server
python3 -m http.server 8000
```

Then navigate to `http://localhost:8000` in any modern web browser.

### Key Interactive Features in the Demo:
- **Multi-Scenario Decision Inspector**: Switch between Industrial, Clinical, Financial, and Energy scenarios to inspect the four logical states, input facts, active constraints, and evidence traces.
- **Edge vs Cloud Comparative Simulator**: Dynamically adjust query volumes and edge nodes to calculate real-time latency differentials, bandwidth savings, and offline uptime guarantees.
- **Public Benchmark Inspector**: Toggle between latency and throughput metrics across all published sample sizes.

---

## Public Boundary & Disclosure Policy

This repository is strictly a **demonstration and evaluation package**. It adheres to a rigorous clean-room public release standard:

- **No Production Code**: Core solver implementations, parsing algorithms, and optimization routines are excluded.
- **No Algorithm Disclosures**: Proprietary logic compilation and graph-deduction techniques are protected.
- **No Private Rule Sets**: All rules and facts displayed in the demo are non-confidential illustrative examples.
- **No Customer Data**: No private customer telemetry, medical charts, financial records, or credentials are contained.
- **Zero Remote Telemetry**: The static demonstration executes 100% locally in the browser with zero external network calls.

---

## Repository Structure

- `index.html` — Interactive static product demonstration page
- `styles.css` — High-performance responsive presentation styles
- `app.js` — Client-side scenario and benchmark simulation logic
- `RESULTS.md` — Detailed benchmark readings, test conditions, and edge analysis
- `docs/public-claims.md` — Verified public capability claims and boundaries
- `docs/demo-guide.md` — Comprehensive walkthrough of the interactive demo
- `assets/` — Original visual SVG graphics and interface assets
- `LICENSE.md` — Proprietary evaluation license terms
- `review/` — Automated verification scanner and public compliance checklist

---

## License & Commercial Inquiries

This demonstration repository is governed by the **Proprietary Evaluation License** ([LICENSE.md](LICENSE.md)).

- **Evaluation & Inspection**: Permitted for personal, technical evaluation, and benchmark verification.
- **Restrictions**: Commercial redistribution, reverse engineering, model extraction, and unauthorized production usage are strictly prohibited.
- **Underlying Technology**: All core decision engines, solver implementations, patents, and commercial products remain the exclusive proprietary property of the owners. For enterprise licensing, contact project maintainers.

---

## Documentation Links

- [Detailed Benchmark Results (RESULTS.md)](RESULTS.md)
- [Public Capability Claims (docs/public-claims.md)](docs/public-claims.md)
- [Interactive Demonstration Guide (docs/demo-guide.md)](docs/demo-guide.md)
- [Proprietary Evaluation License (LICENSE.md)](LICENSE.md)
