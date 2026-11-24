# Demo Guide

## Open the demo

Use a modern browser. Open `index.html` directly, or run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

No build step, account, or network service is required.

## Interactions

### Decision states

Use the four buttons in the Decision states section. Each button shows one published outcome and its evidence note.

### Constraint simulation

Move Business scale and Device count. The result card changes between a feasible plan and no feasible plan. The limits are fixed in the static page and are not a production model.

### Integration paths

Switch between Local engine and Cloud call. The card shows the public path difference.

### Published readings

Switch between Average time and Throughput. The bars use only the values listed in `RESULTS.md`.

## Public scope

The page is a static explanation. It does not accept private input. It does not call a remote service. It does not run the production engine.
