document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#impacto");
  const counters = document.querySelectorAll("[data-counter]");

  if (!section || counters.length === 0) {
    return;
  }

  const formatNumber = (value) =>
    new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(value);

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

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => animateCounter(counter));
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
});

