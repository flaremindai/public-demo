# FlareMind Public Demo

FlareMind is a deterministic, offline decision engine for edge computing.

This repository contains a static demo. It explains the product effects and public results. It does not contain production source code, algorithm details, or system architecture.

## Public features

- Runs offline on common CPUs.
- Produces four clear decisions: Trusted, Undetermined, Refuted, and Inconsistent.
- Does not guess when evidence is not complete.
- Keeps evidence for every result.
- Integrates through an embedded SDK or a local API.
- Uses facts and rules instead of model-only inference.

## Public decision view

Facts and rules enter a constraint check. The engine produces one of four decisions. The result stays traceable to the supplied facts.

This demo uses fixed examples. It does not run inference.

## Static demo

Open `index.html` directly in a browser. No build step is required.

The page contains four public interactions:

1. Four-state decision view.
2. Constraint simulation with business scale and device count.
3. Local engine and cloud call comparison.
4. Performance view for public benchmark readings.

## Results

See [RESULTS.md](RESULTS.md) for the public benchmark values and test conditions.

## Integration

FlareMind supports two public integration paths:

- Embed the SDK inside a local system.
- Call a local API from an application.

The demo shows the integration paths as cards. It does not expose interfaces, endpoints, or implementation details.

## Application scenarios

- Production line release
- Document verification
- Medical order verification
- Role behavior checks
- Design rule checks
- More scenarios

## Public boundary

This repository is a demonstration package only.

It does not include:

- Production source code
- Algorithm implementation
- Rule structures
- System architecture
- Deployment files
- Secret values
- Private customer data

## Local run

No server is required.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Directory

- `index.html` — static demo page
- `styles.css` — page styles
- `app.js` — fixed demo interactions
- `RESULTS.md` — public run conclusions
- `docs/` — public claims and demo guide
- `assets/` — original demo icons

## License

A license file will be added after the owner confirms the license type.
