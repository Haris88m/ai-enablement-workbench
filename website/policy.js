// New browser illustration of the published Servari thresholds, 14 October 2026.
// No agent runs and no external action is performed here.
export function decision(level, score) {
  const thresholds = [
    [0, 0],
    [0, 0],
    [0, 8],
    [0, 12],
    [8, 12],
    [16, 16],
  ];
  if (
    !Number.isInteger(level) ||
    level < 0 ||
    level > 5 ||
    !Number.isInteger(score) ||
    score < 4 ||
    score > 20
  )
    return "queue";
  const [silent, report] = thresholds[level];
  return silent > 0 && score <= silent
    ? "act"
    : report > 0 && score <= report
      ? "report"
      : "queue";
}
