"""Extracted message shaping from Servari chat_byom.py.
Modified 2026-10-14: network, config and credentials removed; offline only.
Functions below retain their original bodies. No model response is simulated.
"""
SYSTEM_LINE = (
    "You are SERVARI, a concise, helpful operating-system assistant. "
    "Answer plainly. If you are unsure, say so."
)

def _newest_user_text(history) -> str:
    """The text of the newest turn whose author is the user. '' if none."""
    if not isinstance(history, list):
        return ""
    for turn in reversed(history):
        if not isinstance(turn, dict):
            continue
        who = str(turn.get("from", "")).lower()
        if who in ("user", "you", "operator", "human"):
            return str(turn.get("text", "")).strip()
    return ""

def _to_messages(history, system: str | None = None) -> list:
    """Map channel turns -> OpenAI chat messages. user -> user; anyone else ->
    assistant. The system line is prepended (caller may override it)."""
    sys_line = (system or "").strip() or SYSTEM_LINE
    msgs = [{"role": "system", "content": sys_line}]
    if isinstance(history, list):
        for turn in history[-20:]:  # cap context to the last 20 turns
            if not isinstance(turn, dict):
                continue
            text = str(turn.get("text", "")).strip()
            if not text:
                continue
            who = str(turn.get("from", "")).lower()
            role = "user" if who in ("user", "you", "operator", "human") else "assistant"
            msgs.append({"role": role, "content": text})
    return msgs

def _max_tokens(cfg) -> int:
    """Reply-length cap from config.json "max_tokens" (default 2048, floor 1)."""
    try:
        return max(1, int(cfg.get("max_tokens") or 2048))
    except Exception:
        return 2048
