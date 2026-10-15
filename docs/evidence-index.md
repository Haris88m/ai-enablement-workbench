# Code and evidence index

Prepared 15 October 2026. This index separates inspectable code, implementation documentation and dated project-review summaries. A published narrative is evidence of what was documented; it is not an independent audit of a private implementation.

## CareerAgent: selected runnable mechanisms

- [Lexical retrieval](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/careeragent/evidence.py#L11-L51): successful source-index records, all-term casefold matching, priority ordering, a bounded excerpt and a permitted text directory. No semantic/vector retrieval.
- [Source-index schema](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/careeragent/schema.py#L21-L55): provenance, content hashes, extraction state and source scope. No private rows are included.
- [Privacy minimization](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/careeragent/privacy.py#L1-L42): heuristic removal of several identifier patterns, not complete anonymization.
- [Receipt checks](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/careeragent/receipts.py#L65-L103) and [status gate](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/careeragent/receipts.py#L105-L151): check synthetic text identity, confirmation wording, receipt bytes and stored state. This code hashes receipt artifacts; the full reviewed-document/claim-binding workflow is described in the [implementation narrative](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/website/engineering.json#L388-L440) and is not reproduced here.
- [Tests](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/tests/test_workflows.py) and [same-commit CI](https://github.com/Haris88m/ai-enablement-workbench/actions/runs/38505420516): 16 offline tests passed when rerun on 15 October 2026. These establish bounded excerpt behavior, not an external application's authenticity, hiring result or full workflow correctness.
- [Provenance map](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/SOURCE_MAP.json#L55-L160) and [publication boundary](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/README.md#L19-L47): extracted functions, adaptations and newly written synthetic harnesses are distinguished. A hash recorded for private source does not make that source publicly inspectable.

## Salience: published implementation narrative

- [Source adapters and deduplication](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/website/engineering.json#L15-L36)
- [Shared context, three specialist roles and partial-result synthesis](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/website/engineering.json#L38-L56)
- [Evidence-quality states and staffing uncertainty](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/website/engineering.json#L58-L76)
- [Atomic persistence, workspace, proposal and task/calendar handoffs](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/website/engineering.json#L78-L125)
- [Source-review boundaries](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/website/engineering.json#L255-L260)

These are public descriptions of inspected private mechanisms. Client implementation code, documents, expert records and integrations are not part of this repository. The portfolio's diagrams and replays are explanations, not production recordings. Exact quote-span validation is a proposed extension rather than an established historical feature.

## SMASH: operations, documents and research

- [ERP source-review narrative](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/website/secondary-cases.json#L3-L23): authenticated tenant/role checks, AI spend precheck, tracked vision extraction, restricted input retrieval, field coercion and structured errors. It does not establish strict schema checks, accounting accuracy or production reliability.
- [Document-production narrative](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/website/secondary-cases.json#L25-L38): structured recipe information and an image manifest become printable pages, with management-confirmation boundaries retained. No original client recipes, costs or operational documents are published here.
- [Dated menu-research aggregate](../website/evidence-snapshots.json): 39 observations at 5 October and 91 at 12 October; 52 added observations, 36 matched regular-price pairs and no changes within those pairs. The appendix records the method and limits. The underlying tracker is not public, so these totals remain reported review findings rather than independently reproducible research.

## Signal: source-reviewed owner-demo summary

The 14 October source review describes a functional discovery-first owner demo with 14 documented identity records and seven criteria-led guidance bundles. Catalog observations date to 17 August 2026. [The aggregate appendix](../website/evidence-snapshots.json) separates category counts, guidance counts and release gates.

The earlier public [blueprint note](https://github.com/Haris88m/ai-enablement-workbench/blob/1c99b93014a253fb40898e1f3b18037a4ef2832b/website/secondary-cases.json#L40-L52) describes a previous research stage and does not establish the later demo. The current summary supersedes that status description; it does not publish the private owner-demo code or offer an independent recount. Commerce is disabled. Current stock, seller participation, personal suitability, effectiveness and external qualified review are not established.

## SOAP benefits: synthetic process demonstration

Allocation → request → approval → supporting evidence → finance review. This concept is separate from Salience procurement. [The appendix](../website/evidence-snapshots.json) states the process and its boundaries. No executable SOAP benefits module or historical test artifact is included in the public workbench. No real employer, payroll integration, tax saving or payment execution is claimed.

## Design and visual materials

The portfolio describes AI-assisted visual direction, menu concepts and brand content. A description is not a gallery of completed client artifacts. Concept visuals should be labelled as concepts; installed equipment, campaign performance and sole manual authorship are not established by this repository.

## Verification and reuse

The public code snapshot reviewed is [1c99b93014a253fb40898e1f3b18037a4ef2832b](https://github.com/Haris88m/ai-enablement-workbench/commit/1c99b93014a253fb40898e1f3b18037a4ef2832b). All 49 fetched files matched their Git blob hashes. The 16 unit tests, offline demo and bounded public-pack pattern checks passed locally on 15 October 2026. These are technical checks, not independent project or outcome validation. No live API calls were performed.

Only the Servari excerpts carry the included Apache-2.0 license. The other inspected material has no additional blanket reuse license. Public access and open-source licensing are different claims.
