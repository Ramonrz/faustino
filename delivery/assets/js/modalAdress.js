let modal = document.getElementById("demo-modal");
document.addEventListener("click", (e) => {
  if (e.target.className === "modal-close") {
    closeModal(modal);
  } else {
    return;
  }
});

const escClose = (e) => {
  if (e.keyCode == 27) {
    //closeModal();
  }
};

const openModal = (modal) => {
  document.body.style.overflow = "hidden";
  modal.setAttribute("open", "true");
  document.addEventListener("keydown", escClose);
  let overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  document.body.appendChild(overlay);
};

const closeModal = (modal) => {
  modal = document.getElementById("demo-modal");
  document.body.style.overflow = "auto";
  modal.removeAttribute("open");
  document.removeEventListener("keydown", escClose);
  document.body.removeChild(document.getElementById("modal-overlay"));
  location.href = "#";
};

openModal(modal);