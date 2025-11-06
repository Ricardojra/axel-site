document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#impacto");
  const counters = document.querySelectorAll("[data-counter]");
  const impactoSection = document.querySelector("#impacto");
  const chartLine = document.querySelector(".impacto__chart-line");
  let impactoObserver;

  if (!section || counters.length === 0) {
    return;
  }

  const formatNumber = (value) =>
    new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(value);

  if (chartLine && typeof chartLine.getTotalLength === "function") {
    const lineLength = chartLine.getTotalLength();
    chartLine.style.setProperty("--impacto-line-length", lineLength);
  }

  const animateCounter = (element) => {
    const target = Number(element.dataset.target || 0);
    const duration = 1600;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const current = Math.floor(target * progress);
      element.textContent = formatNumber(current);

      if (progress === 1) {
        clearInterval(counter);
      }
    }, frameRate);
  };

  if (impactoSection) {
    impactoObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && impactoSection.dataset.animate === 'false') {
          counters.forEach(counter => animateCounter(counter));
          impactoSection.dataset.animate = 'true';
          obs.disconnect();
        }
      });
    }, {
      threshold: 0.35
    });

    impactoObserver.observe(impactoSection);
  }
});
