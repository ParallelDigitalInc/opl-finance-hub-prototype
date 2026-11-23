/* Refine your matches — shared by mobile (one question at a time, bottom sheet) and desktop
   (side panel, OPL Reviews 2289:330535). Figma's 6 questions are cut to 4, one per benefit a
   business can actually claim, in plain words. Dropped: patent/design/trademark (rare for
   these schemes) and "notified industrial area, park or cluster" (few owners can answer it).
   Colours/type follow this kit (#3858E5, Geist), not the panel's old indigo #4338CA / Figtree.

   Ranking (prototype): a Yes counts 1 and a Not sure counts ½ towards every scheme that pays
   the benefit the question is about; schemes are then sorted by that score, ties keep their
   order. Which scheme pays which benefit is sample data (each card's pays list). */
(function () {
  OPL.data = OPL.data || {};

  const R = (OPL.data.subsidyRefine = {
    title: "Refine your matches",
    sub: "Four quick questions. Schemes that fit your business move to the top.",
    choices: ["Yes", "No", "Not sure"],
    questions: [
      { id: "loan", benefit: "interest", q: "Have you taken a term loan, or plan to?", why: "Interest subsidies are for businesses with a term loan" },
      { id: "machinery", benefit: "capital", q: "Did you buy new machinery in the last 2 years?", why: "Capital subsidies pay back part of what you invest" },
      { id: "hiring", benefit: "payroll", q: "Will you hire more people this year?", why: "Some schemes pay part of new employees' salaries" },
      { id: "export", benefit: "export", q: "Do you sell outside India, or plan to?", why: "Export schemes help with freight, fairs and certification" },
    ],
    cta: "Show my matches",
    close: "Close",
    skip: "Skip",
    back: "Back",
    progress: (n, total) => `${n} of ${total}`,
    answered: (n, total) => `${n} of ${total} answered`,
    // refined state of the in-list banner
    doneTitle: "Matches refined",
    doneBody: (n) => n ? `Sorted by your ${n} answer${n > 1 ? "s" : ""}. Best fits are on top.` : "No answers yet, so you're seeing every match.",
    doneCta: "Edit answers",
    toast: (n) => n ? `Matches refined with ${n} answer${n > 1 ? "s" : ""}` : "Showing all matches",
  });

  // answers live for the session (both views share them): { loan: "Yes", … }
  OPL.refine = OPL.refine || { answers: {}, done: false };
  R.count = () => Object.keys(OPL.refine.answers).length;
  R.score = (pays = []) => {
    return R.questions.reduce((s, q) => {
      const a = OPL.refine.answers[q.id];
      return s + (pays.includes(q.benefit) ? (a === "Yes" ? 1 : a === "Not sure" ? 0.5 : 0) : 0);
    }, 0);
  };
  // stable sort by score (only once the user has refined)
  R.rank = (list, paysOf = (c) => c.pays) => {
    if (!OPL.refine.done) return list;
    return list.map((c, i) => ({ c, i, s: R.score(paysOf(c)) })).sort((a, b) => b.s - a.s || a.i - b.i).map((x) => x.c);
  };
})();
