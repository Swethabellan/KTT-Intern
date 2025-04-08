let tyreMilage=120,nsd=180;
function calculateKMMM(tyreMilage, nsd) {
  if (Number(tyreMilage) && Number(nsd)) {
    return Math.round(Number(tyreMilage) / Number(nsd));
  }
  return 0;
}
calculateKMMM(tyreMilage,nsd);