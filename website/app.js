const $ = (s) => document.querySelector(s);
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const para = (s) =>
  String(s || "")
    .split("\n\n")
    .map((p) => `<p>${esc(p)}</p>`)
    .join("");
const fmt = (n) => Number(n).toLocaleString("en-US");
const repo = "https://github.com/Haris88m/ai-enablement-workbench";
let data;
function currentChapter() {
  try {
    return decodeURIComponent(location.hash.slice(1) || "start");
  } catch {
    return "start";
  }
}
$(".skip").addEventListener("click", (event) => {
  event.preventDefault();
  $("#main").focus();
  $("#main").scrollIntoView();
});
const runtimeNavigation = document.createElement("a");
runtimeNavigation.href = "#slack_runtime";
runtimeNavigation.textContent = "Slack integration";
const runtimeSubtitle = document.createElement("span");
runtimeSubtitle.textContent = "Models, incidents and recovery";
runtimeNavigation.append(runtimeSubtitle);
$('#chapters a[href="#enablement"]').before(runtimeNavigation);
const headings = {
  problem_and_inputs: "Start with the source",
  my_contribution: "What I do",
  implementation: "Inside the implementation",
  parallel_work: "Giving agents distinct responsibilities",
  execution_and_recovery: "When the outcome is uncertain",
  useful_result: "What the work makes possible",
  next_improvement: "The next useful measurement",
  policy_design: "A checkable rule before an action",
  context_and_handover: "What must survive the next conversation",
  maintenance: "Keep a change, or restore the baseline",
  design_and_owned_review: "What I asked the system to understand",
  orchestration: "Three specialist analyses, then a synthesis",
  outputs: "What the bid manager receives",
  tools_and_models: "Development tools and runtime models",
  maintenance_priorities: "What I would repair next",
  runtime_design: "Routing, context and model changes",
  maintenance_example: "One incident, and what it taught the system",
  role_transfer: "How I would carry this into Epoch",
  safety_and_spend: "Permissions and spending controls",
};
Object.assign(headings, {
  artifact_lifecycle: "Keeping the reviewed artifact identifiable",
  permission_and_loop_control: "Permissions, context and reply limits",
});
const descriptions = {
  careeragent: [
    "Python",
    "SQLite",
    "Claim provenance",
    "Receipt reconciliation",
  ],
  bid_workflow: [
    "TypeScript",
    "Structured generation",
    "Parallel orchestration",
    "Zod validation",
  ],
  servari: ["Python", "React / Vite", "Model interfaces", "Risk policy"],
  enablement: [
    "Context design",
    "Practical coaching",
    "Systems adoption",
    "Independent use",
  ],
  slack_runtime: [
    "Slack events",
    "Role-scoped context",
    "Canary routing",
    "Recovery runbooks",
  ],
};
const titles = {
  careeragent: "The tool I use to find work.",
  bid_workflow: "From a tender to a decision someone can use.",
  servari: "The working method stays. The model can change.",
  enablement: "Help the person carry the work forward.",
  slack_runtime: "Keep the conversation working when the engine changes.",
};
function codePanel(title, code, path) {
  return `<div class="code-panel"><header><span>${esc(title)}</span><a href="${repo}/blob/main/${path}">Read source ↗</a></header><pre><code>${esc(code)}</code></pre></div>`;
}
function pipeline(title, nodes) {
  return `<section class="architecture"><h3>${esc(title)}</h3><div class="pipeline">${nodes.map(([name, body]) => `<div class="node"><strong>${esc(name)}</strong><small>${esc(body)}</small></div>`).join("")}</div></section>`;
}
function start() {
  return `<p class="eyebrow">Haris Mekic / A technical notebook for Epoch AI</p><h1>I build AI around the work people actually do.</h1><p class="lead">I come from operations and project delivery. I bring the problem, the working context and the judgment. I use coding agents to turn that understanding into systems I can open, test and improve.</p><div class="start-intro"><div><p>SOAP is the name I gave that working method. Super Operations AI Procedures. People and AI workers share the context, follow a procedure and leave a useful record for whoever takes the work next.</p><p>This notebook opens up the implementation. CareerAgent supports my own job search. The bidding workflow connects company context with specialist analysis. Servari explores how models, memory and action controls fit together. My coaching work asks whether another person can use the method independently.</p><div class="actions"><a class="button" href="#careeragent">See the system I use <span aria-hidden="true">→</span></a><a class="button secondary" href="#code">Read and run the code</a></div></div><blockquote class="owner-note"><p>“i speak with people that dont have experience with AI tell me their problems and i immideatly try to create something that would work and be AI assisted tool”</p><cite>My words while developing this application.<br>A working conversation, in my own words.</cite></blockquote></div><section class="method"><p class="eyebrow">How I approach the work</p><div class="method-flow"><div><span class="flow-symbol" aria-hidden="true">↗</span><strong>Understand the job</strong><p>Listen to the person. Look at the real inputs, exceptions and decision they need to make.</p></div><div><span class="flow-symbol" aria-hidden="true">⊞</span><strong>Give it a structure</strong><p>Define context, roles, tools, permissions, handoffs and what a useful result means.</p></div><div><span class="flow-symbol" aria-hidden="true">↻</span><strong>Build and challenge</strong><p>Direct agents, inspect the implementation, test difficult cases and correct the joined workflow.</p></div><div><span class="flow-symbol" aria-hidden="true">⇢</span><strong>Make it continue</strong><p>Keep records, teach the next user and leave enough clarity for maintenance and improvement.</p></div></div></section><section class="section"><h2>What you can inspect here</h2><div class="record"><span class="tag">Working systems</span><div><p>Source-derived Python mechanisms, context and state design, a TypeScript bidding workflow, and Slack integration history.</p><a href="#careeragent">Begin with CareerAgent</a></div></div><div class="record"><span class="tag">Personal investment</span><div><p>Saved local-model experiments, provider usage records and 37 documented paid receipts. The figures show their own scope.</p><a href="#investment">Open the records</a></div></div><div class="record"><span class="tag">The role at Epoch</span><div><p>A proposed first-day approach and 90-day operating plan for an existing automation portfolio, shared AI tools and staff enablement.</p><a href="#epoch">Read the practical plan</a></div></div></section><p class="note">I specify the work, provide context, direct the agents and review the result. The code is AI-assisted. The public examples identify which parts come from existing implementations and which were written for this notebook.</p>`;
}
function caseView(id) {
  const stored = data.cases.cases.find((x) => x.id === id);
  if (!stored) return start();
  const c = { ...stored };
  if (c.narrative) {
    c.opening = c.narrative.split("\n\n")[0];
    c.narrative = c.narrative.split("\n\n").slice(1).join("\n\n");
  }
  let graph = "";
  let source = "";
  if (id === "careeragent") {
    graph = pipeline("The record follows the work", [
      ["Sources", "Documents, metadata and bounded excerpts"],
      ["Claims", "Reusable wording linked to its basis"],
      ["Review", "A tailored artifact and recorded decisions"],
      ["Outcome", "Receipt identity and status reconciliation"],
    ]);
    source = codePanel(
      "CareerAgent / extracted receipt gate",
      data.code.receipt,
      "careeragent/receipts.py",
    );
  }
  if (id === "bid_workflow")
    graph = pipeline("The implemented analysis sequence", [
      [
        "Shared context",
        "Opportunity, requirements, company and source quality",
      ],
      [
        "Parallel specialists",
        "Business fit, bid coordination and data/compliance",
      ],
      [
        "Operations synthesis",
        "Available results plus explicit missing information",
      ],
      ["Bid-manager handoff", "Expert gaps, CV actions and proposal context"],
    ]);
  if (id === "servari") {
    graph = pipeline("A model is one part of the working system", [
      ["Interface", "React/Vite and a local Python API"],
      ["Context", "Work record, session and surviving decisions"],
      ["Model", "Provider-compatible bounded messages"],
      ["Policy", "Act, report or ask for human approval"],
    ]);
    source = codePanel(
      "Servari / actual score validation",
      data.code.policy,
      "servari/autonomy.py",
    );
  }
  const segments = Object.entries(c)
    .filter(([k, v]) => headings[k] && typeof v === "string")
    .map(
      ([k, v]) =>
        `<section class="section" id="${id}-${k}"><h2>${headings[k]}</h2>${para(v)}</section>`,
    )
    .join("");
  const anchors = Object.keys(c)
    .filter((k) => headings[k])
    .map((k) => `<a href="#${id}" data-jump="${id}-${k}">${headings[k]}</a>`)
    .join("");
  return `<div class="case-header"><p class="eyebrow">Working case / ${esc(id.replaceAll("_", " "))}</p><h1>${esc(titles[id] || c.title)}</h1><span class="case-status">${esc(c.maturity)}</span><div class="lead">${para(c.opening || c.narrative?.split("\n\n")[0])}</div></div>${graph}<div class="chapter-links">${anchors}</div><div class="case-layout"><article class="prose">${c.narrative ? para(c.narrative) : ""}${segments}${source}${id === "servari" ? policyDemo() : ""}${id === "enablement" ? coachingWorkflow() : ""}<p class="note">${esc(c.material_boundary)}</p></article><aside class="margin-notes"><div><strong>Technical vocabulary</strong>${(descriptions[id] || []).map((x) => `<p>${esc(x)}</p>`).join("")}</div><div><strong>Source and implementation</strong><p>${id === "bid_workflow" ? "The implementation was inspected locally. Client code and records are kept private." : id === "enablement" ? "Individual trial feedback and established systems-adoption records. Participant messages remain private." : id === "slack_runtime" ? "Private integration source inspected. The historical incident and technical mechanisms are described here." : "Public excerpts identify their source and adaptations."}</p><a href="development-history.json">Development records</a>${id === "careeragent" || id === "servari" ? `<p><a href="${repo}">Open the implementation</a></p>` : ""}</div><div><strong>Read alongside</strong><p><a href="#epoch">The proposed work at Epoch</a></p>${id !== "slack_runtime" ? '<p><a href="#slack_runtime">Slack integration and maintenance</a></p>' : ""}</div></aside></div>`;
}
function coachingWorkflow() {
  return pipeline("A practical coaching loop", [
    ["Bring a task", "The person explains their goal and approved materials"],
    ["Build context", "Separate essentials, background and missing inputs"],
    [
      "Try independently",
      "The person runs and checks a representative assignment",
    ],
    [
      "Review together",
      "Discuss the output and scope a supervised real-work pilot",
    ],
  ]);
}
function policyDemo() {
  return `<section class="try-panel"><p class="eyebrow">Try the decision rule</p><h3>More autonomy still has a boundary.</h3><p class="small">A new browser illustration of the existing Python thresholds. It calculates a verdict locally. No AI call or external action takes place.</p><div class="try-grid"><div><label for="level">Agent autonomy</label><select id="level"><option value="0">Level 0 · Suggest only</option><option value="1">Level 1 · Explicit approval</option><option value="2" selected>Level 2 · Report each safe action</option><option value="3">Level 3 · Batch reports</option><option value="4">Level 4 · Silent on safe work</option><option value="5">Level 5 · Broadest act range</option></select></div><div><label for="risk">Risk score · integer from 4 to 20</label><input id="risk" type="number" value="8" step="1" min="4" max="20"></div><p class="result" id="verdict" aria-live="polite"></p></div></section>`;
}
function investment() {
  const u = data.usage;
  const pay = data.payments.groups;
  const codex = u.earlier_individual_sessions.filter(
    (x) => x.provider === "codex",
  );
  const claude = [
    ...u.earlier_individual_sessions
      .filter((x) => x.provider === "claude")
      .map((x) => ({
        ...x.token_usage,
        label: "Earlier Claude session",
        unique_response_ids: x.unique_response_ids,
      })),
    ...u.additional_individual_sessions,
  ];
  return `<p class="eyebrow">Models, usage and personal investment</p><h1>I kept exploring. Here is what the records show.</h1><p class="lead">I financed this development myself. The work took me from directing coding agents into shared context, provider routing, local-model adaptation, testing and the cost of maintaining the tools.</p><div class="invest-summary"><div><strong>37</strong><span>distinct paid receipts reviewed</span></div><div><strong>8</strong><span>selected sessions with usage metadata</span></div><div><strong>2,721</strong><span>pairs in one recorded LoRA run</span></div></div><section class="section"><h2>Actual payments, not token-price estimates</h2><p>These amounts come from explicit paid receipts. They cover selected payments, not my complete spending history. No conversion or refund reconciliation has been applied.</p><div class="table-wrap"><table class="ledger"><thead><tr><th>Provider</th><th>Receipt window</th><th>Receipts</th><th>Amount paid as displayed</th></tr></thead><tbody>${pay.map((p) => `<tr><td>${esc(p.provider)}</td><td>${esc(p.first_payment)} to ${esc(p.last_payment)}</td><td>${p.receipts}</td><td>${esc(p.currency_display)}${p.documented_amount.toFixed(2)}</td></tr>`).join("")}</tbody></table></div><p class="annotation">The receipts use the dollar symbol. An ISO currency was not established for every receipt, so amounts stay grouped by provider. Failed charges are excluded. Raw billing emails, receipt identifiers and payment details are private.</p><details class="disclosure"><summary>Inspect the individual payment dates and amounts</summary><div class="table-wrap"><table class="ledger"><thead><tr><th>Provider</th><th>Date</th><th>Paid amount</th><th>Item</th></tr></thead><tbody>${pay.flatMap((p) => p.payments.map((x) => `<tr><td>${esc(p.provider)}</td><td>${esc(x.date)}</td><td>${esc(x.currency_display)}${x.amount_paid.toFixed(2)}</td><td>${esc(x.description)}</td></tr>`)).join("")}</tbody></table></div></details><a href="payments.json">Read the minimized payment record</a></section><section class="section"><h2>Tokens tell a story about context reuse</h2><p>One long Codex bidding-development session recorded ${fmt(codex[1].token_usage.input_tokens)} input tokens, including ${fmt(codex[1].token_usage.cached_input_tokens)} cached tokens, and ${fmt(codex[1].token_usage.output_tokens)} output tokens. Large processing counts reflect repeated context and tool use. They are not words I typed.</p><h3>Three selected Codex session counters</h3><div class="legend"><span><i style="background:#1c6652"></i>Uncached input</span><span><i style="background:#96b694"></i>Cached input</span><span><i style="background:#bd8847"></i>Output</span></div><div class="bars">${codex
    .map((x, i) => {
      const t = x.token_usage,
        total = t.input_tokens + t.output_tokens;
      return `<div><div class="bar-label"><span>Session ${i + 1}${i === 1 ? " · bidding development" : ""}</span><span>${fmt(total)} total tokens</span></div><div class="bar-track" role="img" aria-label="${fmt(t.cached_input_tokens)} cached input of ${fmt(t.input_tokens)} input tokens, plus ${fmt(t.output_tokens)} output"><span class="bar-fresh" style="width:${((t.input_tokens - t.cached_input_tokens) / total) * 100}%"></span><span class="bar-cached" style="width:${(t.cached_input_tokens / total) * 100}%"></span><span class="bar-output" style="width:${(t.output_tokens / total) * 100}%"></span></div></div>`;
    })
    .join(
      "",
    )}</div><div class="table-wrap"><table class="ledger"><thead><tr><th>Session</th><th>Input</th><th>Cached subset</th><th>Output</th></tr></thead><tbody>${codex.map((x, i) => `<tr><td>${i + 1}</td><td>${fmt(x.token_usage.input_tokens)}</td><td>${fmt(x.token_usage.cached_input_tokens)}</td><td>${fmt(x.token_usage.output_tokens)}</td></tr>`).join("")}</tbody></table></div><p class="annotation">Maximum cumulative counter per session, counted once. Cached input is already included in input. Reasoning output is already included in output. Sessions can contain inherited or replayed context, so they are not added into an all-time total.</p><h3>Five selected Claude sessions</h3><div class="table-wrap"><table class="ledger"><thead><tr><th>Session</th><th>Input</th><th>Cache read</th><th>Cache creation</th><th>Output</th></tr></thead><tbody>${claude.map((x) => `<tr><td>${esc(x.label)}</td><td>${fmt(x.input_tokens)}</td><td>${fmt(x.cache_read_input_tokens)}</td><td>${fmt(x.cache_creation_input_tokens)}</td><td>${fmt(x.output_tokens)}</td></tr>`).join("")}</tbody></table></div><p class="annotation">Claude response IDs were deduplicated and synthetic records excluded. Cache read and creation have separate provider semantics. These counters cannot be combined with Codex input as though they measured the same thing.</p><p><a href="usage.json">Inspect the usage calculation and coverage</a></p></section><section class="section"><h2>A local-model experiment I can inspect</h2><p>The saved Qwen2.5-1.5B-Instruct adapter records PEFT LoRA with rank 16, alpha 32 and a 0.05 dropout. The run used 2,721 pairs over two epochs, with 8,257,536 trainable parameters. Its summary records 4,847.7373 seconds of training runtime, around 80.8 minutes.</p><p>That is machine runtime, not my working time. I do not have a verified human-hours ledger. The saved adapter and configuration establish that the experiment ran; a held-out task evaluation would establish whether it improved the work.</p><p>I distinguish that parameter training from everyday context engineering. Giving an agent a role, source material and a procedure changes the working setup. It does not, by itself, change model weights.</p></section><section class="section"><h2>The engineering questions behind the numbers</h2>${para(data.cases.cases.find((x) => x.id === "models_and_cost")?.narrative)}</section>${chronicle()}`;
}
function chronicle() {
  return `<section class="section"><h2>How the working method developed</h2><p>Selected professional development records, read alongside the implementation. Dates locate the source history; they are not a time sheet.</p>${data.history.episodes.map((x) => `<div class="record"><time>${esc(x.date)}</time><div><h3>${esc(x.title)}</h3>${para(x.owner_action || x.owner_or_task_direction || "")}${para(x.agent_implementation || x.agent_action || "")}${para(x.output || "")}<details><summary class="small">Scope of this record</summary><p class="small">${esc(x.limits.join(". "))}</p></details></div></div>`).join("")}</section>`;
}
function epoch() {
  const p = data.plan;
  const map = data.roles.responsibilities || [];
  return `<p class="eyebrow">Proposed approach / AI Enablement Manager</p><h1>Understand the existing work.<br>Then make the next change count.</h1><p class="lead">I would begin with the people and automations already doing useful work. The first improvement should follow a clear understanding of what they need.</p><p class="small">Role context checked against <a href="https://jobs.lever.co/epoch-ai/1d8d2e53-1ee7-492e-8f02-f8b52ef19cca">Epoch’s vacancy</a>. The role combines maintaining and building automations with helping staff use AI. Epoch describes an existing portfolio and substantial Claude Tag integration work.</p><section class="section prose"><h2>The first day</h2>${para(p.first_day.answer)}</section><section class="section"><h2>Where my work connects</h2><div class="role-list">${map.map((x) => `<div class="record"><span class="tag">${esc(x.requirement)}</span><div>${para(x.owned_action)}<p class="small">${esc(x.concrete_mechanism)}</p>${x.material_gap ? `<p class="small">Next measurement or experience to establish: ${esc(x.material_gap)}</p>` : ""}<a href="#${x.case_ids?.[0] || "careeragent"}">Read the relevant case</a></div></div>`).join("")}</div></section><section class="section"><h2>The first 90 days</h2>${p.first_90_days
    .map(
      (x) =>
        `<section class="phase"><div class="tag">${esc(x.period)}</div><div><h3>${esc(x.theme)}</h3>${para(x.narrative)}${Object.entries(
          x.workstreams,
        )
          .map(
            ([k, v]) =>
              `<details class="disclosure"><summary>${esc(k.replaceAll("_", " "))}</summary><div>${para(v)}</div></details>`,
          )
          .join(
            "",
          )}<p class="small"><strong>What I would leave behind</strong><br>${x.deliverables.map(esc).join("<br>")}</p><p class="note">Decision to make at this stage: ${esc(x.decision_gate)}</p></div></section>`,
    )
    .join(
      "",
    )}</section><section class="section"><h2>Measure the full work cycle</h2><p>${esc(p.measurement_example.formula)}.</p><p>${esc(p.measurement_example.cautions)}</p>${codePanel("Proposed operational dashboard fields", p.measurement_example.dashboard_fields.join("\n"), "docs/operational-plan.json")}<p class="small">These are fields I would agree with the owners and measure during a pilot.</p></section>`;
}
function code() {
  return `<p class="eyebrow">Public implementation companion</p><h1>Open the code.<br>Run it without an API key.</h1><p class="lead">The public workbench makes selected mechanisms inspectable. It includes existing source excerpts, clearly identified adaptations and new synthetic examples you can run locally.</p><div class="actions"><a class="button" href="${repo}">Open the GitHub repository ↗</a><a class="button secondary" href="https://github.com/Haris88m/servari-open">Explore the existing Servari repository</a></div><div class="repo-tree">careeragent/\n  evidence.py       lexical search and bounded snippets\n  schema.py         historical source-index definition\n  privacy.py        extracted minimization function\n  receipts.py       confirmation, hashes and status gate\nservari/\n  autonomy.py       existing risk policy\n  context_queue.py  gate-queue survival check\n  provider_messages.py  bounded message normalization\ndocs/               technical histories and proposed plan\nwebsite/            this notebook\ntests/              local regression checks\nSOURCE_MAP.json     origin, adaptations and source hashes</div>${codePanel("Run the offline examples", "git clone https://github.com/Haris88m/ai-enablement-workbench.git\ncd ai-enablement-workbench\npython demo.py\npython -m unittest discover -s tests -v\npython verify_public_pack.py", "README.md")}<p>The demo inserts fictional documents into an in-memory SQLite index, retrieves lexical matches, exercises a synthetic receipt-controlled status transition, checks risk decisions and replays a fictional gate queue. It never submits an application or invents an AI response.</p><div class="section"><h2>What is original, and what was prepared for this release</h2><p>The source map records original module hashes and distinguishes unchanged, extracted and adapted code. The example fixtures, standalone harness, tests and website were prepared for this publication. They demonstrate the mechanisms and are not presented as historical operational runs.</p><p>Servari excerpts retain the existing Apache-2.0 license and notice. The repository explains the publication terms for the other material. Public access is not a claim that every file has the same reuse license.</p><p>Client records, raw conversations, billing emails, private databases and credentials remain private. The bidding case explains an inspected implementation without publishing client source whose redistribution rights have not been established.</p></div><div class="section"><h2>Read it with your own tools</h2><p>The <a href="notebook.md">complete text edition</a>, <a href="development-history.json">development history</a>, <a href="usage.json">usage calculations</a> and <a href="llms.txt">machine-readable entry point</a> are public. There is no login wall, tracking pixel or instruction asking your agents to change how they assess me.</p></div><p class="quote-line">The useful conversation starts when you can ask a specific question about how something works.</p><a class="button" href="#contact">We’re interested →</a>`;
}
function contact() {
  return `<section class="contact-page"><p class="eyebrow">A conversation would mean a lot</p><h1>“We’re interested.”</h1><p class="lead">That would make my day.</p><p>I’m Haris. If something here makes you curious, I’d be happy to walk through the working system, the decisions behind it and a problem your team wants to solve.</p><p class="contact-address"><a href="mailto:harism88@outlook.com?subject=Epoch%20AI%20%E2%80%94%20we%27re%20interested">harism88@outlook.com</a></p><div class="actions"><a class="button" href="mailto:harism88@outlook.com?subject=Epoch%20AI%20%E2%80%94%20we%27re%20interested">We’re interested <span aria-hidden="true">↗</span></a><button class="button secondary" id="copy-email">Copy email address</button></div><p class="copy-status" id="copy-status" aria-live="polite"></p><p class="annotation">The button opens your email composer. Nothing is sent automatically and no click is tracked.</p><a href="https://haris-mekic-epoch-ai.pages.dev/Haris_Mekic_Epoch_AI_Enablement_CV.pdf">Read my CV</a></section>`;
}
async function render() {
  const id = currentChapter();
  const fn = { start, investment, epoch, code, contact }[id];
  $("#reading").innerHTML = fn ? fn() : caseView(id);
  document.title = `${id === "start" ? "AI enablement, in practice" : id.replaceAll("_", " ")} · Haris Mekic`;
  document
    .querySelectorAll("#chapters a")
    .forEach((a) =>
      a.setAttribute("aria-current", a.hash === `#${id}` ? "page" : "false"),
    );
  $("#chapters").classList.remove("open");
  $("#menu-toggle").setAttribute("aria-expanded", "false");
  window.scrollTo(0, 0);
  $("#announcer").textContent = `Opened ${id.replaceAll("_", " ")}`;
  document.querySelectorAll("[data-jump]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .getElementById(a.dataset.jump)
        ?.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
    }),
  );
  if ($("#risk")) {
    const { decision } = await import("./policy.js");
    const update = () => {
      const value = $("#risk").value;
      const verdict = decision(
        Number($("#level").value),
        value.trim() === "" ? NaN : Number(value),
      );
      const reasons = {
        act: "The configured level permits acting within this risk band.",
        report: "The configured level permits action with a report.",
        queue:
          "This combination needs review. Invalid scores and high-risk scores are never automatically approved.",
      };
      $("#verdict").innerHTML =
        `<strong>${verdict === "queue" ? "Queue for review" : verdict === "report" ? "Act and report" : "Act"}</strong><br><span class="small">${reasons[verdict]}</span>`;
    };
    $("#risk").addEventListener("input", update);
    $("#level").addEventListener("change", update);
    update();
  }
  if ($("#copy-email"))
    $("#copy-email").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("harism88@outlook.com");
        $("#copy-status").textContent = "Email address copied.";
      } catch {
        $("#copy-status").textContent =
          "Copy this address: harism88@outlook.com";
      }
    });
}
$("#menu-toggle").addEventListener("click", () => {
  const open = $("#chapters").classList.toggle("open");
  $("#menu-toggle").setAttribute("aria-expanded", String(open));
});
Promise.all(
  [
    "cases",
    "payments",
    "usage",
    "development-history",
    "plan",
    "roles",
    "code-excerpts",
  ].map(async (n) => {
    const r = await fetch(`${n}.json`);
    if (!r.ok) throw new Error(n);
    return r.json();
  }),
)
  .then(([cases, payments, usage, history, plan, roles, code]) => {
    data = { cases, payments, usage, history, plan, roles, code };
    render();
    addEventListener("hashchange", render);
  })
  .catch(() => {
    $("#reading").innerHTML =
      '<div class="error-state"><h1>The notebook could not load.</h1><p>Please refresh, or read the <a href="notebook.md">plain-text edition</a> and <a href="https://github.com/Haris88m/ai-enablement-workbench">public repository</a>.</p></div>';
  });
