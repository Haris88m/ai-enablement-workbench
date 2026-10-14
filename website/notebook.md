# Haris Mekic · AI enablement, in practice

Independent technical portfolio for Epoch AI. Prepared with AI assistance from professional source records. Not an Epoch AI website.

I build AI around the work people actually do. I specify needs, provide operational context, direct coding agents and review the result. SOAP means Super Operations AI Procedures.

Public implementation: https://github.com/Haris88m/ai-enablement-workbench

## CareerAgent: my job-search work, with a record that survives the next chat

Status: Working personal system used to support Haris's job search

### opening

I built CareerAgent to keep my career evidence, application work and follow-up connected. A short CV cannot carry the whole context: what I actually did, which source supports it, which wording has been reviewed, and what happened in the previous application. I wanted those decisions to belong to the work, rather than disappear when a chat ends.

### problem and inputs

The inputs are career documents, source records, vacancy information and the owner's decisions. The first job is to separate a source from a claim. A document can establish a title, date or responsibility without proving every achievement someone might infer from it. That distinction becomes part of the context the agents receive.

### my contribution

I define the operational rules and direct AI-assisted development with Claude and Codex. I challenge unsupported figures and wording, ask for inspection before implementation when the state is unclear, and require working records that explain what changed and what still needs checking. The agents do useful research, drafting, implementation and review; I remain the person whose career and decisions the system is supporting.

### implementation

The Python workflow uses SQLite for source and application state, SHA256 hashes for source and receipt integrity, a claim registry for reusable factual wording, and bounded excerpts for evidence review. Retrieval is lexical all-term matching. A claim carries its identifier, evidence identifiers, confidence and boundary; a document-usage record retains the exact wording and target artifact. This gives a reviewer a route from the sentence back to its basis.

### parallel work

This Epoch preparation is a concrete example of the working method. Separate agents inspect evidence, prepare technical content and build the portfolio; their handoffs carry claim identifiers and file locations. The content agent does not decide that a new metric is verified, and the evidence agent does not publish a page. The root reviews the joined result. Parallel work is useful because the responsibilities stay explicit, not because every agent is allowed to do everything.

### execution and recovery

External action belongs to a staged coordinator rather than the drafting agent. It checks ownership, a current lease, the package, timing and receipt identity before recording completion. If an outcome is unknown, the workflow stops for reconciliation instead of blindly repeating the action. A completion message from an agent is not the same thing as an independently checked receipt.

### useful result

I can return to a case and see its source basis, current document, unresolved questions and next safe step. The system makes my own job-search work easier to inspect and continue, while keeping factual and permission decisions visible.

### next improvement

The next useful measurement is the complete work cycle: preparation, checking, corrections and follow-up. That would tell me which parts genuinely reduce effort, rather than counting generated documents as productivity.

### artifact lifecycle

The workflow produces a tailored document and a claim-usage record, then checks text, layout and file identity. The exact reviewed PDF can be registered as an application-ready derivative without replacing the original or earlier credentials. Preparation, upload, submission and receipt reconciliation remain distinct states.

This is job-search support used by Haris, not a replacement for his judgement. Current Epoch preparation is observed; the application is not described as submitted.

## Servari: separate the model from the way the work is controlled

Status: Public local-first control-shell implementation

### opening

I wanted to change the model without having to rebuild the working method around it. That led me to separate the interface, model conversation, working records and action policy. The important question is not just what the model answered, but what the system is allowed to do with that answer.

### implementation

The implementation combines a standard-library Python localhost server, JSON API, React/Vite interface, file-backed state and an optional Electron shell. The model interface sends the last twenty turns, a system instruction and an output-token cap to an OpenAI-compatible endpoint. Missing configuration produces an explicit no-model state instead of an invented response.

### policy design

The action policy validates an integer risk score and the agent's level, then returns act, report or queue. High-risk work queues even at the highest level. Invalid score inputs also queue. This puts a checkable rule between a model's output and a consequential action.

### context and handover

The context policy defines what enters working context, what can be evicted, what must survive and the order of recovery. It checks active work, the current work entry, a risk-recording channel, the gate queue and session record. Checkpointing identifies material that still needs human input. The pressure signal uses transcript size and work-log distance, so I treat it as an operational proxy rather than exact model-window telemetry.

### maintenance

The retention workflow gives a proposed change a baseline and defined check, snapshots selected files and compares the later result. It can keep the change or restore enrolled files with hash verification. That makes an improvement inspectable and reversible within the targets covered by the check.

### useful result

The public code exposes the rules and records behind the shell. A reviewer can inspect the no-config behaviour, gating logic, context checks and keep-or-revert mechanism instead of relying on a polished interface or a completion claim.

The public shell provides policy and control-plane scope; a shipped concurrent autonomous execution engine is not claimed.

## Bid preparation: make the handoff useful to the person deciding

Status: Implemented workflow, developed and demonstrated

### opening

A longer list of tenders was not the result I wanted. If the buyer was unclear, the opportunity did not fit the organisation or the expert record was incomplete, discovery just moved the work downstream. I started with the company's context and the decisions the bid manager had to make.

### design and owned review

I asked for the discovery, specialist analysis, expert, pipeline, task and calendar paths to be inspected together. I challenged whether conclusions came from records or assumptions and required module blueprints to follow the code. Claude and Codex helped turn that assessment into implementation; I directed the context and reviewed whether the pieces formed one coherent process.

### orchestration

An opportunity, source-document status, assignment requirements and organisational context feed three parallel specialist analyses: business fit, bid coordination and data/compliance. Promise.allSettled preserves available results when a branch fails. Operations synthesis runs afterwards with those results, recording complete, partial or failed status. Presentation work is a separate on-demand step.

### outputs

The bid-manager handoff includes expert matches, team gaps, staffing confidence, mobilisation and budget assumptions, CV actions and coordination notes. Expert references are checked against roster identifiers. If the roster is missing, the output is partial and no budget estimate is supplied. Proposal sections receive requirements, evaluation criteria, risks and relevant specialist findings; a Zod schema checks response structure.

### tools and models

Development tools and runtime models are different layers. Claude and Codex support development; the inspected structured-generation configuration uses Gemini 2.5 Flash. A separate control-plane chat uses an Anthropic streaming adapter, role-filtered tools, tool-result blocks, result-size truncation and token accounting.

### useful result

The implementation produces a reviewable route from opportunity context to staffing and proposal preparation. Missing information is actionable rather than hidden inside fluent prose.

### maintenance priorities

The source audit identified an unreachable task-generation branch and a declared tool-call limit that is not enforced inside every returned-tool batch. Those are specific repair priorities. I would fix and regression-test them before depending on those behaviours in a wider workflow.

Useful implemented outputs are described; measured bid wins and company rollout are not established.

## Model experiments and cost: judge the whole workflow

Status: Local adaptation and routing experiments; scoped usage audit

### narrative

I explore unfamiliar technical layers when they answer a practical question. Local-model work took me into Python data preparation, pretrained-model adaptation and inference routing. The inspected training script formats JSONL instructions, tokenises to a bounded length, loads a causal language model and saves PEFT LoRA adapters with run summaries. A saved Qwen2.5-1.5B-Instruct experiment records 2,721 pairs, two epochs and rank 16. The next question is whether it helps on held-out tasks; the saved run alone does not answer that.

The routing implementation chooses a tier using task sensitivity, local availability and registry health. Budget is one signal, not a hard spending cap. Thirteen deterministic selection tests passed in the October audit. Those checks tell me about routing behaviour, not model accuracy.

I also asked for a read-only inventory of billable dependencies, including what was actually used and what might be left over, without printing secrets. The current portfolio usage audit keeps provider counters separate and states its coverage. Cached input, repeated cumulative records and output tokens do not have interchangeable meanings. I would rather show a bounded measurement than turn a large counter into an invented cost or a claim about human hours.

No held-out quality gain, verified all-time cost or human-hours total has been established.

## Slack-facing agents: a model change should not break the working method

Status: Source-implemented private integration with a historical incident and runbook

### opening

I have worked on agents that respond through Slack, not only a separate demonstration interface. I wanted the roles and existing workflows connected before expanding the next product. My acceptance constraint was direct: 'the fix needs to be future proof not only now'. That was a requirement to preserve working behaviour, not permission to change everything around it.

### runtime design

The inspected bridge handles Slack events, thread delivery, role lookup and response routing. Role briefs and a neutral working directory bound the context for company-facing replies. The current source can select CLI, SDK, OpenAI-compatible or Gemini backends. It includes selected-agent canaries and an explicit CLI rollback path, so a new engine can be introduced without immediately moving every role.

### permission and loop control

The SDK configuration replaces the system prompt, inherits no settings, exposes an empty toolset and denies unapproved actions. The reply path has a rolling guard of forty replies in six hundred seconds. That is a concrete loop-control mechanism; I would still measure provider spend and enforce budget decisions separately.

### maintenance example

A June incident showed how a protective rule can become an operational failure. The responders refused to answer because an ancestor directory had a context marker prohibited by their sealed-working-directory check. By the time of inspection, the marker had disappeared; the recorded check passed and the per-call check allowed recovery without a supervisor restart. The useful work was diagnosing that behaviour and hardening the runbook, not making an unnecessary code edit or deleting a file that was no longer there.

### useful result

This gives me a concrete basis for discussing shared AI integrations: where context enters, which backend is selected, how a reply reaches the thread, which actions are allowed, how a change is rolled back and how an intermittent failure is explained to the next maintainer.

### role transfer

For Epoch I would first inspect the existing Claude Tag setup and its connected services. The Slack bridge experience is related integration work, not an assumption that Epoch uses the same architecture or that I have already administered its tools.

Current source was inspected without a live Slack/network test. The incident is historical; private integration code and account details remain private.

## Enablement: start with the person's work, not a prompt library

Status: Individual AI coaching plus established systems-adoption work

### narrative

My enablement work starts with what the person needs to achieve, what they already know and where the task becomes difficult. I translate that into context, a working procedure and a result they can check. In the individual coaching case, the participant tried the method independently on a hypothetical consulting assignment and reported practical value. I then sent a structured proposal covering role-based procedures, reporting and a supervised real-work pilot.

That approach connects with my earlier systems-adoption work at UN Women: practical guidance on Quantum and UNall, supplier submission support, labs with headquarters and the Regional Office, and follow-through when errors needed escalation. It also connects with the Evoluxer project, where I explained procedures, trained two support colleagues and coordinated their daily tasks. The point is to leave the person more capable of carrying the work forward, rather than make them dependent on the person who introduced the tool.

The AI coaching evidence is one hypothetical individual trial and a proposed real-work pilot; that distinction stays visible.

## Documented payments

Selected paid receipts, not an all-time or refund-adjusted total. Dollar symbol as printed, no currency conversion.

Anthropic: $809.52, 20 paid receipts, 2026-01-27 to 2026-06-09.

Lovable: $400.00, 15 paid receipts, 2025-12-30 to 2026-02-02.

ElevenLabs: $33.00, 2 paid receipts, 2026-01-02 to 2026-02-02.

## Usage coverage

Four earlier selected sessions plus four additional professional Claude development sessions streamed in full for metadata. Claude assistant IDs deduplicated, synthetic model records excluded, maximum output counter retained per response. Codex uses one maximum cumulative counter per session, never the sum of repeated rows.

One long bidding-development Codex session records 584,659,763 input tokens, including 520,322,176 cached input tokens, and 2,708,723 output tokens. These are provider processing counters across repeated context and tool use, not words I typed. A separate Claude integration-and-maintenance session records 146,693 uncached input, 160,258,534 cache-read input, 7,536,254 cache-creation input and 795,510 output tokens after response-ID deduplication.

No verified human-hours total is available. Full individual counters and calculation limits: usage.json.

## Proposed first day

I would start with the person currently responsible for enablement, the COO and a few colleagues who use the automations. Epoch already has several dozen workflows and substantial Claude Slack integration work. Before proposing anything new, I would want to understand what people rely on, what breaks, which fixes are waiting and what the current owner knows that is not written down.

I would follow one important workflow from the Slack request or other trigger to the result someone actually uses. That means seeing the prompt or skill, data sources, integration permissions, model call, output, review step and failure path. I would ask the user to show me a recent successful example and an awkward one. If the output needs twenty minutes of correction, that is part of the workflow, not an invisible cost.

Alongside that, I would establish a small working inventory: owner, purpose, users, dependencies, account/access owner, current cost source, health check and safe fallback. I would not collect secret values in the dashboard. An urgent reliability or access problem would take priority over a new feature.

For new opportunities I would ask who needs the result, how often, what they do now and how we would know the change helped. I would compare expected benefit with build effort, review effort, risk, recurring tool spend and maintenance. A useful script or clearer process might win over an LLM workflow. My first pilot would have a task owner, representative examples, a baseline and a stop condition.

I would end the day with a shared picture of the existing estate, the immediate reliability questions and a short ranked list of next investigations. The aim is to make a sound next decision, not announce a replacement platform on day one.

## Days 1-30 · Inherit, stabilise and establish a usable baseline

I would first earn confidence in the existing systems. I would pair with the current owner, watch colleagues use the workflows and review recent incidents before deciding what to change. I would keep the inherited dashboard useful rather than build a competing register. Each workflow would have a named business owner, technical owner, purpose, users, dependencies, health signal and fallback. I would agree with the COO which services are critical and how issues should be escalated.

### production

Trace critical workflows end to end, check schedules/triggers, model/provider changes, schema drift, integration failures and manual fallback. Fix urgent defects with a rollback path and a representative regression check. Confirm what should happen after a timeout, duplicate trigger or partial completion before enabling an automatic retry.

### claude slack

Review Claude Tag app ownership, approved scopes, channel use, connected services, skill/prompt locations and support workflow with the existing administrator. Observe how staff invoke it and where they get stuck. Keep working integrations in place; propose changes through the existing approval process.

### access handover

Record organisation-owned accounts, responsible administrators, service-account dependencies and recovery responsibility. Store references to the secure credential system, never secret values in runbooks. Ask another authorised person to follow one recovery procedure to reveal undocumented knowledge.

### spend

Reconcile subscription/licence records and provider usage with the finance/operations owner. Separate fixed subscriptions from variable calls and cached-input semantics. Identify unused dependencies and duplicate tools, then propose changes instead of cancelling services without the owner.

### staff

Open a predictable beginner-friendly help route, meet new hires and a small mix of research, communications and operations users, and collect actual task examples. Write short guidance around what to supply, how to check the result and when to ask for help.

### priorities

Rank candidate work using frequency, current effort, quality or capacity benefit, downstream review cost, build/maintenance effort, spend and consequence of failure. Use ranges and uncertainty notes rather than invented precision. Select a small number of pilots with named users and acceptance criteria.

Decision gate: The COO and task owners agree on priority and acceptable risk; there is enough baseline information to judge a pilot.

## Days 31-60 · Improve a few real workflows and teach people to own the result

I would use the first month to choose a small number of improvements with clear owners, not to accumulate an ambitious backlog. Each pilot would start with a short specification: the problem, inputs, permitted data/actions, expected artifact, exceptions and acceptance tests. I would direct coding agents in bounded tasks and review the joined workflow with the users who will depend on it.

### build

Choose the simplest appropriate implementation: process change, deterministic script, model-assisted draft or multi-step automation. Separate extraction and validation from interpretation where that makes errors easier to catch. Keep source references with research-support output and human release approval for external communications where required.

### test

Replay representative normal cases plus missing data, stale source, malformed response, permission failure, timeouts and duplicate events. Start in read-only or draft mode where useful. Validate structure in code and factual/task quality with the relevant reviewer; one does not substitute for the other.

### measure

Capture full-cycle effort including preparation and checking, completion/failure and correction rates, active users, provider cost and maintenance time. Record the sample size, dates and baseline method. Compare outcomes for the actual users rather than equating model calls with value.

### models

Evaluate a new tool or model on a fixed, permission-safe set of representative tasks. Compare output quality, latency, cost, data handling and maintainability. Change routing only when the results justify it, with a rollback option and existing workflows checked for regression.

### coaching

Run task-based one-to-one sessions: ask the colleague to bring a real example, build the context together, have them run and inspect the result, then let them repeat it independently. Turn recurring questions into short examples in shared guidance rather than a long generic manual.

### handover

Maintain configuration, dependency, testing, escalation and recovery notes as the pilot changes. Have a second authorised person reproduce a run or perform the documented fallback before calling it ready.

Decision gate: A pilot expands only if its net usefulness is demonstrated and maintenance/access ownership is clear; otherwise revise or stop.

## Days 61-90 · Make the portfolio legible, sustainable and easy to continue

I would turn what we learned into a sustainable operating rhythm. That means clear decisions about which pilots become maintained services, which inherited workflows need repair and which no longer justify their upkeep. I would discuss retirement with users and preserve a fallback or migration route rather than remove a workflow because its usage counter is low.

### portfolio

Review value and cost with the COO and owners. Promote successful pilots with monitoring/runbooks; simplify or retire weak ones after checking hidden dependencies and low-frequency but important uses. Keep the next backlog bounded by available maintenance capacity.

### dashboard

Show the decision information: workflow purpose, beneficiaries, owner, status, last successful run, failure/correction rate, full-cycle effort, cost, last review and next action. Mark estimated values and incomplete samples. Keep detailed logs behind appropriate access, not in the public-facing summary.

### reporting

Report what changed, for whom and how we know: baseline, observed result, measurement window, residual problems and the next decision. Include lessons from stopped pilots; they improve prioritisation rather than disappear from the record.

### staff

Test onboarding with someone new to the system, review support-channel questions and update guidance. Identify colleagues who can answer routine questions and retain an escalation route so basic questions remain welcome.

### resilience

Check that Epoch owns essential accounts/access, run a documented recovery or fallback exercise with another authorised person, and confirm that an absent maintainer would not leave colleagues stranded.

### next quarter

Agree the next priorities using measured pilot results, user requests, reliability debt and spending constraints. Keep model experiments connected to those needs rather than adopt every new capability by default.

Decision gate: The portfolio has an agreed owner and evidence-based next action; adoption and benefit claims match the measurements actually collected.

## Development history

### Two coding assistants, one durable working record

2026-02-25

Continuity between development tools rather than repeatedly restating the same project.

Requested Codex to assess the repository, assign work to Claude and use shared Markdown to record task progress and completion.

The surviving professional session records agent implementation and project-file activity around that direction.

A files-first coordination method: task, changes, verification and next work live with the project.

Scope: Does not prove models share weights or learn from one another; No quantified time saving.

### Bidding relevance before more source volume

2026-03-10

Unclear buyers, weak opportunity relevance, incomplete expert records and workflow relationships that did not connect.

Challenged whether the findings came from real records or assumptions; required module blueprints to reflect the implemented code and a coherent radar-to-analysis-to-workshop flow.

Implemented shared-context specialist analysis; three branches cover business fit, staffing and compliance, then a dependent operations synthesis consumes available results.

Structured analysis with complete, partial or failed state; unknowns remain visible.

Scope: Implementation verified, not measured tender-win uplift or customer adoption; Private client source is not licensed for public redistribution.

### Separating model capability from the surrounding harness

2026-05-18

Understanding what depends on a model and what belongs to reusable context, tools and operating method.

Asked whether the system was an LLM and how different models could attach to the same working method; requested inspection before architectural change.

A defensible distinction between pretrained model, role/context contracts, memory records, provider interfaces and checks.

Scope: Not a claim to have created a foundation model; Provider equivalence not established.

### A Slack-agent incident became a maintenance rule

2026-06-11

A historical Slack responder fleet refused to answer because an ancestor directory contained a context marker forbidden by its sealed-working-directory check.

The supplied task identified the failure mode and requested verification, recovery and runbook hardening.

At inspection the marker had already disappeared. The recorded check returned true; the per-call check allowed recovery without restarting the supervisor. The runbook was updated to explain the intermittent failure and prevention rule.

A documented symptom/cause/diagnose/prevent sequence, with no unnecessary source-code edit or deletion claimed.

Scope: Historical task and agent-maintained incident report, not unaided owner diagnosis; Current source corroborates per-call seal; historical live recovery not freshly rerun; No uptime percentage or nine independently deployed products.

### A future-proof fix must preserve existing workflows

2026-06-15

A workflow needed a deeper fix without breaking already-developed behavior.

Explicitly asked for multiple-agent investigation, a durable fix and precision about preserving working workflows.

A recorded acceptance constraint: improvement must not quietly regress the surrounding system.

Scope: Quote proves the requirement, not successful repair or regression-free production.

### Slack-facing agents with controlled context and reversible engines

2026-06-15 to 2026-10-14 source review

The original professional history explicitly requires wiring the agents and available Slack connector before expanding the next product.

The bridge implements Slack event handlers, thread delivery, role lookup and model response routing. Company-facing responses use bounded role briefs and a neutral working directory. Current code can select CLI, SDK, OpenAI-compatible or Gemini backends, including selected-agent canaries and explicit CLI rollback.

A source-implemented communication surface and model-transition seam rather than only a diagram.

Scope: Fresh source inspection, no network call or current-live Slack health test; Reply guard is not a universal billing cap; Private integration code remains private; No verified enterprise rollout or employer-controlled account handover.

### Audit paid dependencies before adding more infrastructure

2026-06-20

Requested a read-only inventory of billable services, their purpose and which dependencies were leftover or unused, explicitly excluding secret values.

A cost/dependency investigation requirement anchored in an actual professional session.

Scope: Does not prove a dependency was retired or savings realised; Receipt payments separately documented; not inferred from this prompt.

### Local implementation and checks before deployment

2026-06-22 and 2026-07-07

Directed agents to build locally, run tests, QA and end-to-end checks before uploading the result to hosted systems; requested separate builder and tester roles.

Historical assessment contains recorded agent dispatches and bounded passing-test outputs; the source families include working prototypes.

Evidence of staged validation and role separation, not simply asking a chatbot for code.

Scope: Testing requirement is not proof every requested suite passed; No current external adoption/deployment claim; Background stop notifications are not successful completion.

### CareerAgent: evidence survives drafting and browser work

2026 source implementation; reviewed 2026-10-14

The owner reports repeated corrections, lost context and unsupported CV statements; these are reported problems, not a measured baseline.

Python lexical all-term retrieval uses bounded privacy-minimised excerpts; separate SQLite source and application schemas retain provenance and workflow state. Package hashes, claim usage and a staged begin/authorise/complete coordinator bind work to current reviewed artifacts.

Reviewable CV/technical-answer packages and receipt-controlled status; the Epoch role was found during AI-assisted career research and this package is being prepared through the same system.

Scope: Epoch application not submitted; No measured hours saved; Lexical not vector retrieval; Separate database transactions are not distributed ACID; Controls do not prove security assurance or eliminate all browser failures.

### Teaching a context-first method that a participant can try alone

2026-10-10

Provided individual coaching and a framework distinguishing essential task inputs from useful background.

A proposed next-stage working plan with role procedures, reporting, delivery artifacts and a supervised pilot.

Scope: Prior provider-verified register, not email refetched in this pass; One individual hypothetical trial, not company-wide training; No measured learning or productivity uplift; Participant identity/employer/quotes private.

### Local-model adaptation with a clear evaluation boundary

Historical run; numeric artifacts reread 2026-10-14

Saved Qwen2.5-1.5B-Instruct LoRA configuration and run summary record 2,721 pairs, two epochs, rank 16 and 8,257,536 trainable parameters.

A historical adapter artifact and recorded training run dimensions.

Scope: Held-out task improvement unverified; Training runtime is not human working time; Not foundation-model creation or frontier-model superiority.

## Contact

harism88@outlook.com

The application motivation field is not reproduced on this technical site. No photograph or cover letter is included.


# Deeper implementation review

I did not start with an agent and look for something to give it. I started with the work a consultancy has to carry through. Find the right opportunity. Understand the requirements. Know who could deliver it. Prepare a bid that someone can review. I used that operating knowledge to define the context, responsibilities and handoffs, then directed AI-assisted implementation of the system around them.

## Find opportunities at their source

Implemented adapters call the World Bank procurement feed and project-document API, EU TED v3 notice search and the EU Funding and Tenders search service. Other adapters parse feeds or source pages. These are different ingestion methods, not one generic web-search prompt.

HTTP adapters, paginated retrieval, provider response mapping, retry handling, normalized RawTender records

Source references: S01, S02, S03, S04

## Turn scattered notices into a usable record

The pipeline filters relevance, normalizes fields, checks a SHA-256 fingerprint of normalized title, buyer and deadline, and separates new notices from duplicates. Existing matches can contribute enrichment instead of creating another opportunity.

Extract-transform-load pipeline, cross-source deduplication, batch database lookup, provenance-bearing fields

Source references: S05, S06

## Give every role the same operating context

A run assembles the opportunity, source document or terms of reference, previous document analysis, organizational truth snapshot and an evidence-quality summary. External expert candidates remain advisory rather than silently becoming internal roster members. The three specialist roles receive this shared context before generating their own outputs.

Shared typed context, organization-scoped retrieval, document provenance, confidence degradation, role-specific system instructions

Source references: S07, S08

## Let specialists work in parallel, then join the findings

Business development evaluates fit and positioning. Bid coordination examines expert roles, availability, CV actions and budget basis. The requirements specialist structures compliance and evaluation criteria. An operations lead receives their available results for the final synthesis. One rejected specialist call does not erase the other findings.

Fan-out and fan-in orchestration, Promise.allSettled, partial-result envelopes, sequential synthesis

Source references: S07, S08

## Make the staffing assumptions visible

The bid output includes proposed roles, recommended and backup experts, skill and geography overlap, language match, availability, staffing gaps, mobilization estimate, CV actions and a budget range with its basis. The implementation removes invented roster IDs from the top-level expert matches. If the roster is empty, it returns a partial result with no fabricated budget.

Database-grounded expert matching, reference integrity check, uncertainty handling, staffing and cost assumptions

Source references: S08, S09

## Separate a missing document from a weak answer

Context quality distinguishes full, partial, metadata-only and blocked source documents. It also considers relationship evidence, expert availability, outcome history and funder familiarity. Unknown availability is treated as a staffing risk rather than proof that an expert can join.

Evidence-quality model, source completeness, contextual confidence and graceful degradation

Source references: S07, S09

## Keep concurrent work from overwriting itself

Specialist results are merged into the opportunity record through a PostgreSQL RPC using an atomic JSONB update. The read model reconstructs complete or partial runs. This gives subsequent steps a stored handoff rather than requiring the team to recreate the context in another chat.

Atomic persistence, JSONB merge, run metadata, recoverable read model

Source references: S07, S10

## Give the bid manager a workspace, not a transcript

With an authorized Google connection and a configured parent folder, the workflow creates a project workspace with seven areas for source documents, business intelligence, team composition, compliance, technical approach, financial work and proposal assembly. Agent reports can be uploaded into the matching areas. If the integration is unavailable, the analysis does not depend on a successful Drive upload.

OAuth-authorized Google Drive SDK integration, structured artifact lifecycle, parallel uploads, nonfatal external-service failure

Source references: S07, S11

## Carry the analysis into the proposal

The proposal assembler combines opportunity information, bid sections, expert assignments, formatted CVs, partner information, section ordering and a table of contents. A separate assembly path uses available specialist findings for methodology, work plan, positioning and financial proposal content. It prepares a reviewable document structure rather than making the final bid decision.

Deterministic document assembly, template configuration, specialist-result composition, PDF and document export preparation

Source references: S12

## Keep the next action connected to the opportunity

Execution logic derives tasks from missing source packages, missing workspace context, missing specialist analysis and approaching deadlines. It checks for an existing open task before creating another one. Deadline synchronization creates or updates the opportunity's calendar events while preserving manually created events.

Readiness-gap rules, application-level idempotency, lifecycle states, deadline synchronization

Source references: S13, S14

## Connect the working environment

Google API services cover Drive, Gmail, Slides and Calendar. The Calendar service includes both pull and push paths. The governed assistant separately loads live database state, memories and workshop context before streaming a response. Its tool-command endpoint applies role and confirmation policies; this is not the same path as the structured specialist team.

Direct SDK integrations, contextual chat, server-sent events, role-aware command execution and confirmation

Source references: S15, S16

## Choose the model path for the work

The structured application services use Gemini 2.5 Flash with task-specific output budgets and JSON response mode. Grounded web research is a separate text pass before JSON analysis. Transient failures use bounded exponential backoff with jitter. The assistant provider is a separate Anthropic streaming integration that reports usage counters.

Model-specific execution, output contracts, search grounding, retry budgets, usage metadata

Source references: S17, S18

## A task becomes work across an AI team

I wanted to give a team an assignment in the place where we already work, then see who picked it up, what they changed and what still needed a decision. The important part was not giving the agents impressive job titles. It was giving each one the right context and a clear return contract.

### Receive

A Slack task enters a dedicated work path. The listener returns while delegation runs in a background thread.

### Plan

A coordinating model returns JSON with a staffing rationale and independent subtasks. The parser accepts only known engineering-role keys and caps the list at four by default.

### Build

Workers run sequentially from their own role homes with project instructions and memory. The parent task is context; the assigned subtask is the work scope. Tools are enabled on this build path.

### Return

Each role reports files touched, verification and remaining work in the same Slack thread. A final synthesis combines those reports. If synthesis fails, a mechanical summary preserves the recorded statuses.

The build prompt separates the parent task from the worker's specific assignment, adds a role specialty and requires a status-tagged handoff. The coordinator receives bounded excerpts of each worker's reply for synthesis. These are runtime context contracts, not changes to model weights.

The final runtime ok flag means the orchestration returned, not that every worker completed successfully. Source implements sequential workers; this case must not be animated as concurrent fan-out. No commercial adoption or measured time savings is claimed.

## Keep the working method when the model changes

I do not want my work to depend on one chat window remembering everything. I want to change the model, keep the context that matters and still know which actions need my decision. Servari is where I made those controls visible.

### Bring context

The chat adapter maps the last twenty channel turns to user/assistant messages and prepends a configurable system instruction.

### Use a model

A standard-library Python HTTP request calls an OpenAI-compatible chat-completions endpoint. Output defaults to a 2,048-token cap. Missing configuration returns a no-model state.

### Check authority

A separate deterministic policy evaluates an integer risk score from four through twenty and the agent's autonomy level. High-risk and malformed scores queue for review.

### Preserve work

Context checks look for active work, a current work entry, risk records, pending decisions and a session record. The retention module snapshots enrolled files and can keep or restore a change after a metric comparison.

Admission rules, eviction priorities, survival pins and a recovery contract make context an explicit operational concern. Context pressure is estimated from transcript size and work-log distance; it is not direct provider context-window telemetry.

This public shell is not presented as a shipped concurrent autonomous execution engine. Provider chat, context policy, action policy and retention are distinct modules; the walkthrough must not imply that every model reply automatically runs the full chain.

## The application has to survive checking

This application is part of the work itself. I use AI to research roles, recover the relevant parts of my experience and prepare material for a particular company. I needed a system that could explain every claim and remember what happened, not simply produce another confident letter.

### Find the basis

Python queries successful source-index records in SQLite, performs all-term lexical matching and returns bounded, privacy-minimized excerpts with source identifiers.

### Bind the claim

The preparation workflow links exact wording to claim and evidence identifiers and associates it with a reviewed artifact. Hashes distinguish the reviewed file from later edits.

### Control action

A central coordinator checks the current package, approval route and a global lease. Duplicate, active and unknown-outcome attempts stop a fresh action.

### Reconcile

Receipt-backed status is distinct from an agent's completion message. Interrupted attempts without a trusted terminal state become UNKNOWN and require reconciliation.

The working context separates a source, a supported claim, owner confirmation, a generated artifact and an external outcome. Handoffs preserve identifiers and file identity so a new agent can continue without inventing the missing history.

This is AI-assisted career work with human factual and permission decisions. It is not a promise of fully autonomous applications or a claim that every previous application passed every gate at every historical moment.

## Learn the model layer by building an experiment

I also went below the prompt. I wanted to understand what it takes to prepare examples, adapt a small model and choose where a request should run. That work taught me to keep a saved training result separate from an improvement I can actually demonstrate.

### Prepare

JSONL prompt/completion pairs become instruction-formatted examples, tokenized to a maximum sequence length of 512.

### Adapt

A pretrained causal language model receives PEFT LoRA adapters. The saved Qwen2.5-1.5B-Instruct run uses rank sixteen and four named target modules.

### Record

The run saves adapter configuration, weights and training metadata. The inspected summary records 2,721 pairs, two epochs and 8,257,536 trainable parameters.

### Route

A separate inference-tier selector considers sensitivity, local availability and healthy registry nodes, then produces a tier and reasoning. The documented budget is a routing signal, not a universally enforced spend cap.

The training path changes a small pretrained model through adapters. That is technically different from the role prompts, memory files and SOP context used by the other systems. Keeping the distinction explicit makes the portfolio more credible.

No foundation model was trained from scratch. No held-out quality gain, commercial deployment or human-hours total is claimed.