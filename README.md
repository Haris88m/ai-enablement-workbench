# AI enablement workbench

Haris Mekic's technical working notebook for practical AI enablement. I define the operational problem, provide context, direct coding agents and review the result. This repository opens selected actual CareerAgent and Servari mechanisms alongside clearly identified new examples. It began as an application companion in October 2026 and now also documents part of my broader [MEKreflect research practice](https://mekreflect.com/).

The [application portfolio](https://haris-mekic-epoch-ai.pages.dev) is a dated record of my AI-assisted research and development across Salience, CareerAgent, SMASH, Signal, SOAP benefits and visual work, followed by a proposed first day at Epoch. The [code and evidence index](website/evidence-index.md) distinguishes runnable excerpts, public source-review narratives and dated research summaries. Most project implementations remain private; this is not a complete source release for every portfolio case. This is my independent portfolio, not an Epoch AI product. Current company research and consultations are at [mekreflect.com](https://mekreflect.com/); the original application material is retained here with its historical context.

## Run it

Python 3.11+; standard library only. No package installation, API key, paid service, model download or network access is needed.

```console
python demo.py
python -m unittest discover -s tests -v
```

The demo creates a temporary directory, inserts three explicitly synthetic documents into an in-memory SQLite source index, searches them, exercises a synthetic receipt-gated transition, checks low/high-risk policy decisions, replays a fictional gate queue and shapes a provider request. Temporary state is removed on exit. No real application is submitted and no AI response is fabricated.

## Actual code you can inspect

| Mechanism | Implementation | Origin and boundary |
| --- | --- | --- |
| Lexical evidence retrieval | `careeragent/evidence.py` | Callable adaptation of CareerAgent's all-term casefold search, priority ordering and bounded snippet algorithm. No embeddings or semantic ranking. |
| Source-index schema | `careeragent/schema.py` | Unchanged historical initialization definition; no rows, private records or runtime migrations. |
| Privacy minimization | `careeragent/privacy.py` | Extracted original function. Useful minimization, not a complete anonymization guarantee. |
| Receipt integrity and state | `careeragent/receipts.py` | Original `set_status` function body plus an adapted generic confirmation/identity/hash parser and newly written minimal schema. Not the full production coordinator. |
| Risk-policy dial | `servari/autonomy.py` | Unchanged existing Apache-2.0 source module. Integer risk scores 4–20; high-risk scores queue at every level. Decision policy, not an executor. |
| Provider-neutral messages | `servari/provider_messages.py` | Original three message-normalization function bodies; network/configuration/credential handling omitted. Constructs messages; does not call a provider. |
| Context survival check | `servari/context_queue.py` | Adaptation of the existing gate-queue replay function with an explicit path parameter. Checks one survival pin, not the complete context policy. |

`SOURCE_MAP.json` distinguishes extracted, unchanged, adapted and NEW files, recording original module SHA-256 values without private filesystem paths. All synthetic fixtures, the demo, tests and these notes were created for this public package on 14 October 2026; they are not presented as historical operational artifacts.

The complete existing public Servari companion is [servari-open](https://github.com/Haris88m/servari-open). These selected Servari files retain its Apache-2.0 license and notice in `servari/`.

## Workflow and review boundary

Source index → lexical matches with minimized snippets → evidence-linked drafting and human review in the full private workflow → receipt content/identity checks → integrity-checked status change. This excerpt demonstrates retrieval and the state gate, not the full drafting agent or any browser-submission authority.

The receipt example is intentionally synthetic. A text parser can verify confirmation language, matching identity and artifact integrity; it cannot establish that an authentic external employer issued an arbitrary text file. The full private system additionally has channel-specific checks, independent receipt capture, authorization, duplicate/unknown-outcome controls and a submission coordinator. Those are not reproduced here. This package must not be used to bypass them or operate on real applications.

## Scope and provenance

No complete private repository or history, private database contents, runtime logs, raw conversations, CV sources, client records, participant names, credentials, model weights or paid-call configuration are bundled. SOAP/bidding source is excluded because publication rights have not been established. Professional coaching is not represented as a software module. Tests prove this excerpt package's local behavior, not customer adoption, hiring results or commercial performance.

The original Servari policy intentionally accepts int-coercible persisted autonomy levels; its risk-score decision boundary is stricter and rejects booleans, floats and strings. The lexical algorithm is substring-based, not a relevance search engine; date handling and privacy redaction are heuristic. These limitations are preserved and documented rather than silently upgraded.

## Licensing

Servari excerpts: Apache-2.0, with included upstream `servari/LICENSE` and `servari/NOTICE`. Other material is published for inspection; no additional blanket reuse license is granted here. Public access does not make every file Apache-2.0.

## Read the development story

`docs/development-history.json` records selected professional episodes, inputs, my directions, agent work and observed outputs. `docs/operational-plan.json` is a prospective first-day and 90-day approach, not a historical achievement. `docs/usage.json` keeps provider counters separate, and `docs/payments.json` reports only the reviewed paid receipts. Raw conversations, source databases and billing records are not published.

The original application itself is a CareerAgent case. I asked agents to inspect professional records, prepare technical material, build the notebook and review the joined result. My review rejected an earlier page for being too generic; this release adds the implementation depth and recorded development decisions. That iteration is part of the method, not proof of improved hiring outcomes.

## Preview the website

```console
python -m http.server 4184 --bind 127.0.0.1 --directory website
```

Open `http://127.0.0.1:4184`. The site uses plain HTML, CSS and JavaScript, with public JSON and a full Markdown edition. It needs no build system, analytics service or secret configuration. The CV link opens the existing hosted document rather than bundling personal contact details in Git history.

The live portfolio and this repository website snapshot may differ. The evidence index identifies the exact public code commit reviewed. The standalone evidence appendix contains only public-safe summaries and clearly labelled review boundaries. `website/engineering.json` contains the public-safe deeper case studies; `website/secondary-cases.json` describes the supplemental source review; `website/source-index.json` explains their reviewed source components without publishing private filesystem paths or client source. The Salience narrative covers official-source adapters, normalized and deduplicated notices, shared role context, three parallel analyses followed by operations synthesis, proposal preparation, task generation and calendar synchronization. Source review is distinct from a fresh authenticated integration test.

Code, documentation and this publication were prepared with AI assistance under my direction. The source map separates existing implementation from new publication work.
