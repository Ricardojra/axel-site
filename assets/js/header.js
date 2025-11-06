function toggleMenu() {
  const navigation = document.querySelector(".navigation");
  const hamburger = document.querySelector(".hamburger-menu");

  if (!navigation || !hamburger) {
    return;
  }

  navigation.classList.toggle("active");
  const isActive = navigation.classList.contains("active");
  hamburger.classList.toggle("is-active", isActive);
  hamburger.setAttribute("aria-expanded", String(isActive));
}

document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.querySelector(".navigation");
  const hamburger = document.querySelector(".hamburger-menu");

  if (!navigation || !hamburger) {
    return;
  }

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navigation.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
});
