# Public Run Results

This page records the public run results shown by the static demo. The values below are the public benchmark readings from the product website. This repository does not include production code or hidden technical detail.

## Test conditions

| Item | Public value |
| --- | --- |
| State nodes | 200 |
| Execution mode | single CPU thread |
| Deduction depth | 5 steps |
| Network | not required for local mode |

## Benchmark readings

| Sample size | Average time (ms) | Throughput (queries/s) |
| ---: | ---: | ---: |
| 100 | 0.475 | 2,103 |
| 1,000 | 0.474 | 2,109 |
| 10,000 | 0.515 | 1,941 |
| 50,000 | 0.444 | 2,254 |

## Result notes

- The reading stays close across the four sample sizes on the published test conditions.
- The demo shows the readings only as static values.
- The demo does not run the production engine.
- The demo does not expose an implementation path.
- The demo does not collect input data.

## Demo observations

The static demo provides four public interactions:

1. Four decision states: trusted, undetermined, refuted, and inconsistent.
2. Two constraint controls: business scale and device count.
3. Two integration descriptions: local engine and cloud call.
4. Benchmark readings from the public table above.
