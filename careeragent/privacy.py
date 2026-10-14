"""Exact privacy_minimize function extracted from CareerAgent common.py.
Not a complete anonymization guarantee; synthetic examples only.
"""
import re

def privacy_minimize(value: str) -> str:
    value = re.sub(r"(?i)\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", "[email redacted]", value)

    def redact_phone_candidate(match: re.Match) -> str:
        candidate = match.group(0)
        digits = re.sub(r"\D", "", candidate)
        normalized_candidate = candidate.strip().strip("()[]")
        numeric_date = re.compile(
            r"\d{1,4}[./-]\d{1,2}[./-]\d{1,4}"
            r"(?:\s*(?:-|–|—|to)\s*\d{1,4}[./-]\d{1,2}[./-]\d{1,4})?",
            re.IGNORECASE,
        )
        date_match = numeric_date.search(normalized_candidate)
        date_context = ""
        if date_match:
            date_context = (
                normalized_candidate[:date_match.start()]
                + normalized_candidate[date_match.end():]
            )
            date_context = re.sub(r"[\s()[\]./–—-]+", "", date_context)
        if (
            len(digits) < 8
            or numeric_date.fullmatch(normalized_candidate)
            or (date_match and (not date_context or re.fullmatch(r"\d{4}", date_context)))
        ):
            return candidate
        return "[number redacted]"

    value = re.sub(
        r"(?<!\w)(?:\+?\d[\d .()/-]{7,}\d)(?!\w)", redact_phone_candidate, value
    )
    value = re.sub(
        r"(?i)\b(?:iban|swift|bic|account(?: number| no\.?)|passport(?: number| no\.?)?|national id)\b"
        r"\s*[:#-]?\s*[A-Z0-9 -]{5,}\b",
        "[sensitive identifier redacted]", value,
    )
    return value
