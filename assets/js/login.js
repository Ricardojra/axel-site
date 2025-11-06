document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("login-modal");
  const triggers = document.querySelectorAll("[data-login-trigger]");
  const dismissControls = document.querySelectorAll("[data-login-dismiss]");

  if (!modal || triggers.length === 0) {
    return;
  }

  const openModal = () => {
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  triggers.forEach((trigger) => trigger.addEventListener("click", openModal));
  dismissControls.forEach((control) =>
    control.addEventListener("click", closeModal)
  );

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });

  const form = modal.querySelector(".login-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      // TODO: integrar chamada real para API de autenticação
      const submitButton = form.querySelector(".btn.btn--primary");
      if (submitButton) {
        submitButton.textContent = "Entrando...";
        submitButton.disabled = true;
        setTimeout(() => {
          submitButton.textContent = "Entrar na plataforma";
          submitButton.disabled = false;
          closeModal();
          alert("Autenticação simulada. Integre com a API real.");
        }, 1500);
      }
    });
  }
});
