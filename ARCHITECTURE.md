# Architecture and evidence boundaries

This is a standalone, offline extraction/adaptation package, not the complete CareerAgent production architecture.

```text
New synthetic documents
    → original source-index initialization schema (in-memory SQLite)
    → adapted lexical search (all terms, casefold, priority order)
    → original minimization function → bounded public snippet

New synthetic confirmation text
    → generic identity + confirmation predicate
    → receipt SHA-256 recorded
    → original set_status gate rechecks identity association + validation + hash
    → synthetic local state transition

Synthetic risk score + per-agent level
    → original Servari policy → act / report / queue verdict (no execution)

Synthetic pending/decision queue
    → original replay logic with explicit path → survival-pin result

Synthetic conversation turns
    → original provider message normalization → request messages (no transport)
```

## What stayed historical

The source-index initialization definition, privacy minimizer, status-transition function body, Servari autonomy module and three message-shaping bodies are extracted from existing implementation. The source map records full original-module hashes. Historical does not mean independently production-certified; source existence proves implementation rather than business outcomes.

## What changed for publication

The lexical main loop became a callable API with explicit connection/root, bounded arguments and no private path output. Only the generic text receipt branch was adapted; provider-specific schemas and employer-specific exceptions were omitted. The gate queue path became a parameter. Wrapper imports/docstrings and the minimal receipt schema are new. No hidden network client is present in the demo.

## What is deliberately absent

The complete private career database, research sources, factual drafting agents, channel-specific receipt authentication, external-action authorization, central lease, global quotas, portal UI, employer exceptions, model transport, client bidding implementation and historical runtime state are not included. There is no claim that separate database commits form a single distributed ACID transaction.

## Human responsibility

An autonomy verdict is not authorization to act; a synthetic text receipt is not an external submission; a matching source snippet is not a complete factual claim. A real workflow requires a named owner, trusted evidence, permissions, human review, stop conditions and independent reconciliation. The public example demonstrates mechanisms without pretending to provide these organizational guarantees.
