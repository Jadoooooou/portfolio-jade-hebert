

const btnPropos = document.querySelector(".button-apropos");
if (btnPropos) {
btnPropos.addEventListener("click", function() {
  window.location.href = "propos.html";
});
}

const btnRevenir = document.querySelector(".revenir");
if (btnRevenir) {
  btnRevenir.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}