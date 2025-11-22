document.addEventListener("DOMContentLoaded", () => {
  const impactoSection = document.querySelector("#impacto");
  const counters = document.querySelectorAll("[data-counter]");
  const chartLine = document.querySelector(".impacto__chart-line");

  if (!impactoSection || counters.length === 0) {
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

  const showFinalValue = (element) => {
    const target = Number(element.dataset.target || 0);
    element.textContent = formatNumber(target);
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const triggerAnimations = () => {
    if (impactoSection.dataset.animate === "true") {
      return;
    }

    impactoSection.dataset.animate = "true";

    if (prefersReducedMotion) {
      counters.forEach(showFinalValue);
      return;
    }

    counters.forEach(animateCounter);
  };

  if ("IntersectionObserver" in window) {
    const impactoObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          triggerAnimations();
          obs.disconnect();
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -20% 0px"
    });

    impactoObserver.observe(impactoSection);
  } else {
    triggerAnimations();
  }
});
