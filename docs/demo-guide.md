# Interactive Demonstration Guide

This guide provides a comprehensive walkthrough for evaluating the FlareMind static public demonstration.

---

## 1. Quick Launch Instructions

The demonstration is completely static and requires zero build steps, accounts, or external network services.

### Local Browser Execution
You can open `index.html` directly in any modern web browser, or launch a lightweight local server:

```bash
# From the repository root
python3 -m http.server 8000
```

Then navigate to: `http://localhost:8000`

---

## 2. Interactive Sections & Walkthrough

### 2.1 Multi-Scenario Decision Inspector (`#decision`)
This module demonstrates how FlareMind's four-valued logic evaluates multi-variable facts across distinct high-consequence industries.

1. **Select an Industry Scenario**:
   - **Industrial Quality Control**: Precision robotic torque verification and assembly line stage clearance.
   - **Clinical Order Verification**: Pediatric medication dosage checking and contraindication screening.
   - **Financial & Trade Compliance**: International sanctions screening and cross-border payment compliance.
   - **Autonomous Power Interlock**: Substation circuit breaker safety interlocking.
2. **Toggle the Four Decision States**:
   - Click **`Trusted`**: Observe how complete, verified facts satisfy the active constraint.
   - Click **`Undetermined`**: Observe how missing facts (e.g. missing calibration or absent lab report) cause the engine to halt safely without guessing.
   - Click **`Refuted`**: Observe how out-of-tolerance facts trigger immediate, clear rejection.
   - Click **`Inconsistent`**: Observe how conflicting sensor or record feeds trigger a telemetry integrity fault.
3. **Inspect the Output Cards**:
   - Check the **Supplied Input Facts** column.
   - Check the **Active Constraint Evaluated** box.
   - Read the formal **Evidence Trace** generated for audit compliance.

### 2.2 Edge vs Cloud Comparative Simulator (`#simulator`)
This module illustrates the compounding performance and bandwidth advantage of local edge execution over centralized cloud APIs.

1. **Adjust the Sliders**:
   - **Decisions Per Second**: Tune the evaluation frequency per edge node (50 to 2,000 queries/sec).
   - **Active Edge Gateways**: Scale the number of deployed edge units (1 to 64 nodes).
2. **Review Real-Time Calculations**:
   - **Decision Latency**: Local execution remains fixed at **0.47 ms** (deterministic), while cloud calls incur ~125 ms latency (260x slower).
   - **Network Bandwidth**: Local edge requires **0 KB** egress, compared to gigabytes of daily transmission for cloud APIs.
   - **Outage Resilience**: Demonstrates 100% autonomous operation during total network disconnections.

### 2.3 Technical Comparison Matrix (`#comparison`)
A side-by-side technical evaluation contrasting FlareMind against Cloud LLMs (e.g. GPT-4) and Heavy Legacy Rule Frameworks (e.g. Drools). Key parameters compared include mathematical certainty, latency, resource footprint, and auditability.

### 2.4 Public Benchmark Inspector (`#benchmark`)
Inspect published benchmark readings under controlled laboratory conditions (200 state nodes, single CPU thread, 5 deduction levels).

1. Toggle between **Average Decision Time (ms)** and **Throughput (Decisions/sec)**.
2. Inspect the dynamic chart bars comparing 100, 1,000, 10,000, and 50,000 query evaluation runs.
3. Review the detailed benchmark table and read the three key takeaways: Constant-Time Scaling, Zero Hardware Acceleration, and Minimal Memory Footprint.

### 2.5 Integration Pathways (`#integration`)
Explore the two supported edge integration models:
- **Embedded SDK**: Zero-copy, in-process C/Rust/Wasm bindings for real-time micro-controllers.
- **Local Micro-Daemon**: High-speed loopback IPC for multi-process Linux edge devices.
- Review the conceptual JavaScript/TypeScript client usage contract snippet.

---

## 3. Public Verification Boundary

The demonstration operates strictly on static, client-side data:
- No user input is collected or transmitted.
- No remote network requests are executed.
- The demonstration reflects verified public website benchmarks and capability profiles without disclosing private algorithms or proprietary source code.
