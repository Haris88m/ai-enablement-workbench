const $ = (id) => document.getElementById(id);
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const link = (href, label) => `<a href="${esc(href)}">${esc(label)}</a>`;
let data,
  section = "work",
  selected = "salience",
  scene = 0,
  timer,
  playing = !matchMedia("(prefers-reduced-motion: reduce)").matches,
  speed = 1;
let reduced = matchMedia("(prefers-reduced-motion: reduce)");
const workNav = [
  ["salience", "Bidding operations"],
  ["slack-workforce", "An AI team in Slack"],
  ["career-evidence", "CareerAgent"],
  ["servari-control", "Servari"],
  ["local-model-lab", "Model laboratory"],
];
const epochNav = [
  ["listen", "Understand the work"],
  ["prioritize", "Choose what matters"],
  ["build", "Build with the user"],
  ["continue", "Make it continue"],
];
const visuals = {
  salience: [
    [
      "Procurement notices",
      "Digital public services consulting",
      "Example search",
      "Normalized opportunity",
      ["Source and notice ID", "Buyer and deadline", "Document links"],
      ["World Bank API", "EU TED API", "Funding search"],
      ["fetch", "map", "merge"],
      "Opportunity record",
      [
        "One source-linked notice",
        "Duplicate matched",
        "Contract ceiling unknown",
      ],
      "Ready for context",
    ],
    [
      "Tender documents",
      "Brief, terms and evaluation criteria",
      "Illustrative record",
      "Shared context",
      [
        "Organization snapshot",
        "Expert roster + availability",
        "Evidence-quality summary",
      ],
      ["Company fit", "Staffing evidence", "Document quality"],
      ["load", "check", "grade"],
      "Context envelope",
      ["Source completeness", "Availability unresolved", "Boundaries retained"],
      "One context, three roles",
    ],
    [
      "Shared envelope",
      "Same assignment and evidence for each role",
      "Fan-out",
      "Role instructions",
      ["Responsibility", "Output contract", "Known uncertainties"],
      ["Business development", "Bid coordination", "Requirements"],
      ["parallel", "parallel", "parallel"],
      "Specialist findings",
      ["Fit and positioning", "Expert availability gap", "Missing annex"],
      "Partial results preserved",
    ],
    [
      "Three findings",
      "Available results and recorded gaps",
      "Fan-in",
      "Operations synthesis",
      ["Specialist findings", "Confidence and missing data", "Next decision"],
      ["Fit result", "Staffing result", "Compliance result"],
      ["join", "join", "join"],
      "Bid manager review",
      [
        "Conditional proceed",
        "Confirm lead availability",
        "Obtain missing annex",
      ],
      "Illustrative recommendation",
    ],
    [
      "Stored analysis",
      "Expert assignments and draft sections",
      "Atomic merge",
      "Bid workspace",
      [
        "PostgreSQL JSONB result",
        "Authorized Drive folder",
        "Proposal template",
      ],
      ["Team composition", "Technical approach", "Financial assumptions"],
      ["file", "file", "file"],
      "Reviewable proposal",
      [
        "Methodology and work plan",
        "CV annexes and sections",
        "Budget basis to review",
      ],
      "No automatic submission",
    ],
    [
      "Readiness gaps",
      "Missing source package and approaching deadline",
      "Rules evaluate",
      "Execution state",
      ["Current lifecycle stage", "Existing open tasks", "Source deadline"],
      ["Task generator", "Deadline sync", "Review owner"],
      ["check", "update", "decide"],
      "Next actions",
      ["Upload source package", "Run missing analysis", "Deadline reminder"],
      "Repeat pass reuses records",
    ],
  ],
  "slack-workforce": [
    [
      "Slack assignment",
      "A scoped build request in one thread",
      "Sample task",
      "Task envelope",
      ["Parent objective", "Thread reference", "Delegation budget"],
      ["Coordinator", "Role roster", "Background runner"],
      ["plan", "check", "start"],
      "Staffing plan",
      ["Known role keys", "Independent subtasks", "Four-subtask default"],
      "Illustrative staffing",
    ],
    [
      "Working plan",
      "Build a bounded feature and verify it",
      "JSON decomposition",
      "Role assignment",
      ["Specialty", "Assigned subtask", "Parent task as context"],
      ["Backend worker", "Frontend worker", "QA worker"],
      ["queued", "queued", "queued"],
      "Bounded work",
      [
        "Role home selected",
        "Project instructions loaded",
        "No nested delegation",
      ],
      "Default one delegation",
    ],
    [
      "Assigned subtask",
      "Each worker receives its own scope",
      "Sequential execution",
      "Role context",
      ["Working directory", "Project instructions", "Memory + allowed tools"],
      ["Backend worker", "Frontend worker", "QA worker"],
      ["DONE", "RUNNING", "WAITING"],
      "Worker report",
      ["Files touched", "Verification performed", "DONE / PROGRESS / BLOCKED"],
      "Illustrative worker states",
    ],
    [
      "Role reports",
      "Bounded excerpts return to coordinator",
      "Same Slack thread",
      "Synthesis context",
      ["Artifacts", "Verification notes", "Unresolved work"],
      ["Backend report", "Frontend report", "QA report"],
      ["collect", "collect", "collect"],
      "Thread handoff",
      ["Combined result", "Remaining decisions", "Mechanical fallback"],
      "Completion stays inspectable",
    ],
  ],
  "career-evidence": [
    [
      "Vacancy requirement",
      "Find a supported example of workflow delivery",
      "Source lookup",
      "Evidence query",
      [
        "Successful extraction",
        "All-term lexical match",
        "Privacy-minimized excerpt",
      ],
      ["SQLite index", "Python query", "Source identifiers"],
      ["read", "match", "return"],
      "Evidence shortlist",
      [
        "Relevant source excerpt",
        "Stable evidence ID",
        "No full private document",
      ],
      "Illustrative query",
    ],
    [
      "Supported claim",
      "Separate wording from what the source proves",
      "Owner review",
      "Claim record",
      ["Claim identifier", "Source references", "Exact artifact hash"],
      ["Evidence review", "Writing task", "Document review"],
      ["verify", "draft", "inspect"],
      "Application package",
      [
        "Traceable wording",
        "Reviewed CV derivative",
        "Open decisions recorded",
      ],
      "Preparation is not submission",
    ],
    [
      "Reviewed package",
      "External action needs its own checks",
      "Central coordinator",
      "Action context",
      ["Approval route", "Current artifact identity", "Global action lease"],
      ["Duplicate check", "Lease check", "Outcome check"],
      ["check", "check", "check"],
      "Decision gate",
      ["Ready or blocked", "UNKNOWN stops retry", "Reconciliation required"],
      "No Epoch submission shown",
    ],
    [
      "External outcome",
      "An agent saying done is not a receipt",
      "Reconcile",
      "Outcome record",
      ["Attempt identity", "Trusted terminal signal", "Receipt identity"],
      ["Receipt check", "Artifact binding", "State update"],
      ["inspect", "bind", "record"],
      "Recorded result",
      [
        "Verified receipt if present",
        "Unresolved if missing",
        "Safe continuation path",
      ],
      "Synthetic case only",
    ],
  ],
  "servari-control": [
    [
      "Conversation",
      "Keep the task when the provider changes",
      "Message adapter",
      "Bounded context",
      [
        "System instruction",
        "Last twenty channel turns",
        "User / assistant roles",
      ],
      ["Map turns", "Bound history", "Prepare envelope"],
      ["map", "bound", "send"],
      "Model request",
      [
        "Compatible chat endpoint",
        "2,048 output-token default",
        "Explicit no-model state",
      ],
      "Illustration of chat module",
    ],
    [
      "Message envelope",
      "Send through the configured provider",
      "Python HTTP adapter",
      "Configuration",
      ["Endpoint", "Model identifier", "Secure credential reference"],
      ["Request", "Response", "Unavailable path"],
      ["send", "read", "handle"],
      "Reply or no-model state",
      [
        "No fabricated response",
        "Provider-independent shape",
        "Configuration stays private",
      ],
      "Chat module only",
    ],
    [
      "Proposed action",
      "High risk with autonomy set to level five",
      "Separate policy example",
      "Authority check",
      ["Integer risk 4–20", "Autonomy L0–L5", "Malformed input handling"],
      ["Validate score", "Apply policy", "Queue review"],
      ["check", "decide", "hold"],
      "Human decision",
      ["High risk queued", "Malformed score queued", "No automatic execution"],
      "Policy is a separate module",
    ],
    [
      "Working files",
      "Protect context beyond one conversation",
      "Separate retention example",
      "Durable state",
      [
        "Active work + decisions",
        "Context survival pins",
        "Enrolled-file baseline",
      ],
      ["Check context", "Compare metric", "Keep or restore"],
      ["check", "compare", "record"],
      "Continuity record",
      ["Missing-context report", "Snapshot hash", "Enrolled files retained"],
      "Not a whole-machine rollback",
    ],
  ],
  "local-model-lab": [
    [
      "Training examples",
      "Prompt and completion pairs",
      "Private data not shown",
      "Dataset preparation",
      ["JSONL records", "Instruction formatting", "512-token sequence limit"],
      ["Format", "Tokenize", "Batch"],
      ["prepare", "encode", "load"],
      "Training batches",
      [
        "2,721 recorded pairs",
        "Bounded sequence length",
        "Reproducible preparation",
      ],
      "Historical experiment",
    ],
    [
      "Pretrained model",
      "Qwen2.5-1.5B-Instruct",
      "Base remains pretrained",
      "PEFT configuration",
      ["LoRA rank 16", "Alpha 32", "Four target modules"],
      ["q_proj / v_proj", "o_proj", "down_proj"],
      ["adapter", "adapter", "adapter"],
      "Small adapter layers",
      [
        "8,257,536 trainable params",
        "Gradient accumulation",
        "Two recorded epochs",
      ],
      "Not foundation-model training",
    ],
    [
      "Completed run",
      "Saved adapter and run summary",
      "Recorded machine run",
      "Experiment record",
      ["Configuration", "Weights", "Training summary"],
      ["Adapter file", "Run metadata", "Review"],
      ["save", "save", "inspect"],
      "Inspect the result",
      [
        "2,721 pairs / 2 epochs",
        "80.8 machine minutes",
        "No held-out gain asserted",
      ],
      "Not human working hours",
    ],
    [
      "Inference request",
      "Choose a tier for the work",
      "Separate routing module",
      "Routing signals",
      ["Sensitivity", "Local availability", "Healthy registry nodes"],
      ["Check policy", "Check availability", "Explain route"],
      ["check", "check", "select"],
      "Tier and reasoning",
      [
        "Local or hosted route",
        "Availability-dependent",
        "Budget signal, not hard cap",
      ],
      "Source-based illustration",
    ],
  ],
};
const epochCases = {
  listen: {
    title: "Trace one real workflow before changing it",
    intro:
      "I would start with the person who maintains the systems and the people who use them. I want to see a normal case and an awkward one, including the checking work after the model responds.",
    scenes: [
      [
        "Meet the people behind the workflow",
        "I would ask a colleague to show me the result they actually need, what they do now and where they lose time. The existing maintainer’s knowledge comes first.",
        "Task observation, service ownership, user discovery",
      ],
      [
        "Trace the entire path",
        "I would follow the trigger, prompt or skill, data source, permissions, model response, review and final use. One successful run and one failure teach different things.",
        "Dependency mapping, failure paths, access boundaries",
      ],
      [
        "Leave a useful first-day record",
        "I would end with an initial inventory, urgent reliability questions and a short list of investigations with owners. Not a replacement platform announced on day one.",
        "Service inventory, incident triage, named ownership",
      ],
    ],
    visual: [
      [
        "A colleague’s task",
        "Recent normal and difficult examples",
        "Proposed observation",
        "Working context",
        ["Desired result", "Current process", "Review effort"],
        ["Task owner", "Current maintainer", "Operations owner"],
        ["show", "explain", "align"],
        "First-day notes",
        ["Who needs the result", "Where the friction is", "What already works"],
        "Proposed approach",
      ],
      [
        "Existing automation",
        "Follow a run from trigger to final use",
        "Proposed trace",
        "Dependency map",
        ["Prompt + skill", "Data + permissions", "Model + downstream use"],
        ["Happy path", "Failure path", "Manual fallback"],
        ["trace", "trace", "check"],
        "Service record",
        ["Owner and dependencies", "Health signal", "Recovery questions"],
        "No presumed architecture",
      ],
      [
        "Observed friction",
        "Prioritize urgent reliability issues",
        "Day-one decision",
        "Initial inventory",
        [
          "Critical services",
          "Undocumented dependencies",
          "Available baseline",
        ],
        ["Stabilize", "Investigate", "Assign owner"],
        ["first", "next", "agree"],
        "Shared next step",
        ["Immediate risks", "Ranked investigations", "Named task owners"],
        "Agreed with the team",
      ],
    ],
  },
  prioritize: {
    title: "Automate the work that earns its upkeep",
    intro:
      "A model call is not a productivity measure. I would compare the complete work cycle, including preparation, corrections, running cost and maintenance, before deciding what to build.",
    scenes: [
      [
        "Start with frequency and consequence",
        "I would ask how often the work happens, who benefits and what happens if the output is wrong. Important low-frequency work should not disappear behind a usage count.",
        "Expected value, consequence of failure, baseline sampling",
      ],
      [
        "Count the checking work too",
        "I would compare current effort with the proposed full cycle, including preparation and human review. A script or process change can be the better choice.",
        "Net benefit, deterministic alternatives, uncertainty ranges",
      ],
      [
        "Choose a small, reversible pilot",
        "I would agree on a task owner, representative examples, acceptance criteria and a stop condition. The next decision should be easy to explain.",
        "Bounded pilot, quality threshold, rollback and stop criteria",
      ],
    ],
    visual: [
      [
        "Candidate workflow",
        "One recurring task from a real user",
        "Proposed assessment",
        "Decision context",
        ["Frequency", "Current effort", "Failure consequence"],
        ["Benefit", "Risk", "Maintenance"],
        ["estimate", "assess", "estimate"],
        "Comparable options",
        ["Value and uncertainty", "Who benefits", "Evidence still needed"],
        "No invented ROI",
      ],
      [
        "Full work cycle",
        "Preparation + execution + checking",
        "Proposed measurement",
        "Cost basis",
        ["Observed baseline", "Human review time", "Fixed + variable spend"],
        ["Process change", "Deterministic script", "Model-assisted flow"],
        ["compare", "compare", "compare"],
        "Ranked options",
        [
          "Expected net usefulness",
          "Quality alongside time",
          "Owner can challenge estimate",
        ],
        "Not model calls as value",
      ],
      [
        "Preferred option",
        "Smallest pilot that answers the question",
        "Proposed approval",
        "Pilot contract",
        ["Task owner", "Acceptance examples", "Stop condition"],
        ["Read-only run", "Owner evaluation", "Expand or stop"],
        ["trial", "review", "decide"],
        "Next decision",
        [
          "Useful enough to maintain?",
          "Quality acceptable?",
          "Ownership clear?",
        ],
        "Team decides scope",
      ],
    ],
  },
  build: {
    title: "Build with the person who will use it",
    intro:
      "I would turn a real task into an explicit working contract, direct coding agents in bounded assignments and inspect the joined result with its user. Coaching belongs inside that process.",
    scenes: [
      [
        "Make the context executable",
        "I would document the inputs, permitted sources, actions, expected artifact and exceptions. Each agent needs a responsibility and a return contract.",
        "Context engineering, role contracts, bounded tool permissions",
      ],
      [
        "Test the inconvenient cases",
        "I would replay missing data, malformed output, duplicate triggers, timeouts and permission failures. Structure checks and factual review answer different questions.",
        "Regression tests, replay fixtures, draft-mode rollout",
      ],
      [
        "Teach someone to repeat the work",
        "I would coach the colleague through their own example, then ask them to run it independently and challenge the result. Recurring questions become short shared guidance.",
        "Task-based coaching, prompt and skill library, user acceptance",
      ],
    ],
    visual: [
      [
        "User’s real task",
        "Outcome and representative examples",
        "Proposed specification",
        "Working contract",
        [
          "Inputs and allowed data",
          "Output and exceptions",
          "Acceptance criteria",
        ],
        ["Coding agent", "Task reviewer", "Integration review"],
        ["build", "check", "join"],
        "Testable workflow",
        [
          "Bounded implementation",
          "Visible assumptions",
          "Reviewable artifact",
        ],
        "Proposed pilot",
      ],
      [
        "Representative fixtures",
        "Normal, missing and malformed data",
        "Proposed testing",
        "Evaluation set",
        [
          "Reference outputs",
          "Permission boundary",
          "Duplicate and timeout cases",
        ],
        ["Structure tests", "Task-quality review", "Failure recovery"],
        ["test", "review", "replay"],
        "Evaluation record",
        ["Passes and corrections", "Known limitations", "Fallback verified"],
        "No fabricated results",
      ],
      [
        "Colleague’s example",
        "Build the context together",
        "Proposed coaching",
        "Reusable guidance",
        ["What to provide", "How to inspect output", "When to ask for help"],
        ["Guided run", "Independent run", "Feedback"],
        ["show", "try", "refine"],
        "Colleague-owned practice",
        ["Short shared example", "Confidence to question", "Escalation route"],
        "Learning, not dependency",
      ],
    ],
  },
  continue: {
    title: "Make the next person able to continue",
    intro:
      "I would keep the portfolio understandable to its users and maintainers. The record should show who owns it, whether it is useful, what it costs and how another person recovers it.",
    scenes: [
      [
        "Make ownership explicit",
        "I would record organization-owned access, dependency owners, configuration, tests and recovery steps. Secret values stay in approved secure storage.",
        "Runbooks, access ownership, tested handover",
      ],
      [
        "Report what changed for people",
        "I would show the baseline, observed result, sample window, corrections, running cost and next decision. A stopped pilot is useful learning too.",
        "Operational health, benefit measurement, portfolio dashboard",
      ],
      [
        "Keep, improve or retire",
        "I would review the portfolio with the owners, protect hidden dependencies and agree the next quarter’s priorities. Maintenance capacity is part of that decision.",
        "Lifecycle management, dependency review, sustainable capacity",
      ],
    ],
    visual: [
      [
        "A maintained workflow",
        "Someone else must be able to recover it",
        "Proposed handover",
        "Service runbook",
        [
          "Account owner references",
          "Configuration + tests",
          "Recovery procedure",
        ],
        ["Current owner", "Second maintainer", "Task user"],
        ["document", "reproduce", "verify"],
        "Continuity package",
        ["Epoch-owned access", "Tested fallback", "Clear escalation"],
        "No secrets in the dashboard",
      ],
      [
        "Observed operation",
        "Actual runs, corrections and spend",
        "Proposed reporting",
        "Measurement record",
        [
          "Baseline and window",
          "Full-cycle effort",
          "Quality and recurring cost",
        ],
        ["Health review", "Value review", "User feedback"],
        ["inspect", "compare", "listen"],
        "Portfolio dashboard",
        ["What changed", "For whom", "How we know"],
        "No invented improvement figures",
      ],
      [
        "Portfolio review",
        "Results and remaining maintenance capacity",
        "Proposed decision",
        "Next-quarter context",
        ["User needs", "Hidden dependencies", "Reliability debt"],
        ["Keep", "Improve", "Retire"],
        ["maintain", "prioritize", "agree"],
        "Sustainable backlog",
        [
          "Owned priorities",
          "Safe migration if retired",
          "Learning carried forward",
        ],
        "Agreed with COO and owners",
      ],
    ],
  },
};
function current() {
  if (section === "epoch") {
    const c = epochCases[selected];
    return {
      title: c.title,
      type: "Proposed approach at Epoch AI",
      intro: c.intro,
      scenes: c.scenes.map((s) => ({
        title: s[0],
        copy: s[1],
        technical: s[2],
      })),
      visual: c.visual,
    };
  }
  if (selected === "salience")
    return {
      title: "From source notice to bid manager",
      type: "Salience bidding case study · SOAP",
      intro: data.engineering.salience.voice,
      scenes: data.engineering.salience.scenes.map((s) => ({
        title: s.title,
        copy: s.narration,
        technical: s.technical_caption,
      })),
      visual: visuals.salience,
    };
  const c = data.engineering.systems.cases.find((x) => x.id === selected);
  return {
    title: c.title,
    type: c.eyebrow,
    intro: c.firstPerson,
    scenes: c.flow.map((s) => ({
      title: s.label,
      copy: s.detail,
      technical: c.mechanisms.slice(0, 4).join(" · "),
    })),
    visual: visuals[selected],
  };
}
function route() {
  const focusedCase = document.activeElement?.closest('#cases a')?.getAttribute('href');
  let hash;
  try {
    hash = decodeURIComponent(location.hash.slice(1));
  } catch {
    hash = "";
  }
  const parts = hash.split("/");
  section = parts[0] === "epoch" ? "epoch" : "work";
  const nav = section === "work" ? workNav : epochNav;
  selected = nav.some((x) => x[0] === parts[1]) ? parts[1] : nav[0][0];
  scene = 0;
  $("details").hidden = true;
  $("details-open").setAttribute("aria-expanded", "false");
  $("details-open").textContent = "Read the engineering";
  $("eyebrow").textContent =
    section === "work"
      ? "My working practice, opened up"
      : "AI Enablement Manager · a proposed approach";
  $("headline").textContent =
    section === "work" ? "AI, put to work." : "Understand. Build. Enable.";
  $("intro").textContent =
    section === "work"
      ? "I start with someone’s work. I listen, build the context and turn it into a system people and AI agents can work through together. This is how I have been developing SOAP."
      : "I would join an existing practice, not arrive with a replacement platform. My first job would be to understand what people rely on, what needs repair and where a useful improvement is worth making.";
  document
    .querySelectorAll("[data-section]")
    .forEach((a) => {
      if(a.dataset.section === section) a.setAttribute('aria-current','page');
      else a.removeAttribute('aria-current');
    });
  $("cases").innerHTML = nav
    .map(
      ([id, title], i) =>
        `<a href="#${section}/${id}" ${id === selected ? 'aria-current="page"' : ""}><span>${String(i + 1).padStart(2, "0")}</span><strong>${esc(title)}</strong></a>`,
    )
    .join("");
  render();
  if(focusedCase) $('cases').querySelector(`a[href="#${section}/${selected}"]`)?.focus();
}
function render() {
  if(!data) return;
  clearTimeout(timer);
  const focusedStep = document.activeElement?.dataset?.step;
  const c = current(),
    s = c.scenes[scene],
    v = c.visual[scene];
  $("case-title").textContent = c.title;
  $("case-type").textContent = c.type;
  document.querySelector('.technical .micro').textContent = section==='epoch'?'PROPOSED METHOD':'IN THE IMPLEMENTATION';
  $('visual').dataset.mode = selected==='slack-workforce'?'sequential':selected==='servari-control'||selected==='local-model-lab'?'modules':'connected';
  $("scene-title").textContent = s.title;
  $("scene-copy").textContent = s.copy;
  $("scene-technical").textContent = s.technical;
  $("scene-index").textContent =
    `${String(scene + 1).padStart(2, "0")} / ${String(c.scenes.length).padStart(2, "0")}`;
  ["input-title", "input-body", "input-foot", "context-title"].forEach(
    (id, i) => ($(id).textContent = v[i]),
  );
  $("context-fields").innerHTML = v[4]
    .map((t) => `<span>${esc(t)}</span>`)
    .join("");
  $("workers").innerHTML = v[5]
    .map(
      (t, i) =>
        `<div class="worker"><span>${esc(t)}</span><span>${esc(v[6][i] || "")}</span></div>`,
    )
    .join("");
  $("output-title").textContent = v[7];
  $("output-lines").innerHTML = v[8]
    .map((t) => `<span>${esc(t)}</span>`)
    .join("");
  $("output-foot").textContent = v[9];
  $("activity-text").textContent =
    section === "work"
      ? selected === "slack-workforce"
        ? "Sequential build workers · separate from sealed chat"
        : selected === "servari-control"
          ? "Separate modules shown together · no automatic action chain"
          : selected === "local-model-lab"
            ? "Historical experiment · separate routing module"
            : "Source-reviewed mechanism · illustrative record"
      : "Proposed workflow · not a claim about Epoch’s current systems";
  $("steps").innerHTML = c.scenes
    .map(
      (s, i) =>
        `<button data-step="${i}" aria-label="Scene ${i + 1}: ${esc(s.title)}" ${i === scene ? 'aria-current="step"' : ""}>${i + 1}</button>`,
    )
    .join("");
  $("steps")
    .querySelectorAll("button")
    .forEach((b) =>
      b.addEventListener("click", () => {
        scene = Number(b.dataset.step);
        playing = false;
        render();
      }),
    );
  if(focusedStep!==undefined) $('steps').querySelector(`[data-step="${focusedStep}"]`)?.focus();
  $("replay-note").textContent =
    section === "work"
      ? "Illustrated replay of source-reviewed mechanisms. Sample records, not a live client session."
      : "A proposed approach based on the role description. Priorities would be agreed with Epoch’s team.";
  document.body.classList.toggle("paused", !playing || document.hidden);
  document.body.classList.toggle("reduced", reduced.matches);
  $("play").textContent = playing ? "Pause" : "Play";
  $("play").setAttribute(
    "aria-label",
    playing ? "Pause walkthrough" : "Play walkthrough",
  );
  $("visual").classList.remove("scene-enter");
  void $("visual").offsetWidth;
  if(playing && !reduced.matches) $("visual").classList.add("scene-enter");
  if (
    playing &&
    !document.hidden &&
    !$("investment").open &&
    !$('overview').open &&
    $("details").hidden
  )
    timer = setTimeout(() => {
      scene = (scene + 1) % c.scenes.length;
      render();
    }, 8000 / speed);
}
function detail() {
  const c = current();
  let body = `<h3>${esc(c.title)}</h3><p>${esc(c.intro)}</p>`;
  if (section === "work" && selected === "salience") {
    const s = data.engineering.salience;
    body += `<div class="detail-grid">${s.capabilities.map((x) => `<section><h4>${esc(x.title)}</h4><p>${esc(x.explanation)}</p><p><code>${esc(x.technical)}</code></p></section>`).join("")}</div><h4>How I would adapt it</h4><p>${esc(s.adaptation)}</p><p class="source-note">${esc(s.implementation_status)} JSON output mode is not universal runtime schema validation. ${link("source-index.json", "Inspect the source component index")} · ${link("engineering.json", "Read the complete implementation record")}</p>`;
  } else if (section === "work") {
    const s = data.engineering.systems.cases.find((x) => x.id === selected);
    body += `<h4>What I directed</h4><p>${esc(s.contribution)}</p><h4>The context engineering</h4><p>${esc(s.contextEngineering)}</p><div class="detail-grid"><section><h4>Implemented mechanisms</h4><ul>${s.mechanisms.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section><section><h4>What comes back</h4><ul>${s.outputs.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section></div><h4>Controls that matter</h4><ul>${s.controls.map((x) => `<li>${esc(x)}</li>`).join("")}</ul><p class="source-note">${esc(s.boundary)} ${link(s.publicCode || "https://github.com/Haris88m/ai-enablement-workbench", "Inspect public code")} · ${link("engineering.json", "Read the implementation record")}</p>`;
  } else {
    body += `<h4>First-day outputs</h4><ul>${data.plan.first_day.outputs.map((x) => `<li>${esc(x)}</li>`).join("")}</ul><h4>Beyond the first day</h4>${data.plan.first_90_days.map((p) => `<h4>${esc(p.period)} · ${esc(p.theme)}</h4><p>${esc(p.narrative)}</p><p>${esc(p.decision_gate)}</p>`).join("")}<p class="source-note">${link("plan.json", "Read the detailed operating plan")} · ${link("https://jobs.lever.co/epoch-ai/1d8d2e53-1ee7-492e-8f02-f8b52ef19cca", "Epoch’s role description")}</p>`;
  }
  $("details").innerHTML = body;
}
function investment() {
  const groups = data.payments.groups;
  $("investment-content").innerHTML =
    `<h3>37 documented paid receipts</h3><table><thead><tr><th>Provider</th><th>Receipts</th><th>Amount shown</th></tr></thead><tbody>${groups.map((g) => `<tr><td>${esc(g.provider)}</td><td>${g.receipts}</td><td>$${g.documented_amount.toFixed(2)}</td></tr>`).join("")}</tbody></table><p>Selected receipts, not a lifetime total. Dollar labels are reproduced as shown, without assuming every receipt uses the same ISO currency. Failed charges are excluded. ${link("payments.json", "Read scope and minimized payment records")}.</p><h3>One long bidding-development session</h3><table><tbody><tr><th>Input tokens processed</th><td>584,659,763</td></tr><tr><th>Cached input, already included above</th><td>520,322,176</td></tr><tr><th>Output tokens</th><td>2,708,723</td></tr></tbody></table><p>One maximum cumulative Codex counter, counted once. These are context and tool-processing records, not words I typed or a measure of quality. The wider inspected sample contains three Codex and five Claude sessions with different counter semantics. ${link("usage.json", "Inspect the usage method")}.</p><h3>A small-model experiment</h3><p>The saved LoRA run records 2,721 training pairs, two epochs, 8,257,536 trainable adapter parameters and 80.8 minutes of machine training. It does not establish a held-out quality improvement. I do not have a verified total of my human working hours.</p><p>${link("development-history.json", "Read the development history")} · ${link("notebook.md", "Read the full technical notebook")}</p><details><summary>Watch the illustrated workflow summary</summary><p>Five-second typographic overview, not a recording of a live system.</p><a href="https://gcdn.picsart.com/media-engine/b8a56212-9b8e-474d-a67f-ff82926e860e.gif">Open the animated GIF</a></details>`;
  $("investment").showModal();
  clearTimeout(timer);
  document.body.classList.add("paused");
}
$("play").addEventListener("click", () => {
  if(!data) return;
  if(!$('details').hidden){$('details').hidden=true;$('details-open').setAttribute('aria-expanded','false');$('details-open').textContent='Read the engineering';}
  playing = !playing;
  render();
});
$("speed").addEventListener("change", (e) => {
  speed = Number(e.target.value);
  render();
});
$("next").addEventListener("click", () => {
  if(!data) return;
  scene = (scene + 1) % current().scenes.length;
  playing = false;
  render();
});
$("previous").addEventListener("click", () => {
  if(!data) return;
  scene = (scene + current().scenes.length - 1) % current().scenes.length;
  playing = false;
  render();
});
$("details-open").addEventListener("click", () => {
  if(!data) return;
  const open = $("details").hidden;
  if (open) {
    detail();
    playing = false;
  }
  $("details").hidden = !open;
  $("details-open").setAttribute("aria-expanded", String(open));
  $("details-open").textContent = open
    ? "Close engineering"
    : "Read the engineering";
  render();
});
$("investment-open").addEventListener("click", () => data && investment());
$("investment-close").addEventListener("click", () => $("investment").close());
$("investment").addEventListener("close", render);
$('overview-open').addEventListener('click',()=>{
  $('overview-media').innerHTML='<img src="https://gcdn.picsart.com/media-engine/b8a56212-9b8e-474d-a67f-ff82926e860e.gif" width="960" height="540" alt="Illustrated loop from context to agents, tools, review and human handoff">';
  $('overview').showModal();clearTimeout(timer);document.body.classList.add('paused');
});
$('overview-close').addEventListener('click',()=>$('overview').close());
$('overview').addEventListener('close',()=>{$('overview-media').replaceChildren();render();});
document.addEventListener("visibilitychange", () => data && render());
reduced.addEventListener("change", () => {
  if (reduced.matches) playing = false;
  render();
});
window.addEventListener("hashchange", () => {
  if (location.hash !== "#main" && data) route();
});
try {
  const names = ["engineering", "plan", "payments"];
  const values = await Promise.all(
    names.map(async (n) => {
      const r = await fetch(`${n}.json`);
      if (!r.ok) throw Error(n);
      return r.json();
    }),
  );
  data = Object.fromEntries(names.map((n, i) => [n, values[i]]));
  if(!Array.isArray(data.engineering?.salience?.scenes)||data.engineering.salience.scenes.length!==6||!Array.isArray(data.engineering?.systems?.cases)||data.engineering.systems.cases.length!==4||!Array.isArray(data.payments?.groups)||!Array.isArray(data.plan?.first_90_days))throw Error('Invalid portfolio data');
  route();
} catch {
  data = null;
  clearTimeout(timer);
  $("case-title").textContent = "The interactive data could not load";
  $("visual").innerHTML =
    '<p class="load-error">Please reload, or read the <a href="notebook.md">complete technical notebook</a>. Your place is preserved in the address.</p>';
  playing = false;
  ['play','previous','next','speed','details-open','investment-open'].forEach(id=>$(id).disabled=true);
}
