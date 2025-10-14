gsap.registerPlugin(ScrollTrigger);

const elements = gsap.utils.toArray([
  // Section Hero
  '.name p:last-child',
  // Section Projets
  '.text-wrapper-projet',
  // Section À propos
  '.text-wrapper-propos',
  '.a-propos-content',
  // Section Contacts
  '.text-wrapper-contact',
  '.contact p:first-of-type',
  // Page À propos
  '.moi p',
  '.competences-content h2',
  '.competences-content p',

]);

// Animations dévoilement des textes
elements.forEach(el => {
  if (el) {
  gsap.fromTo(
    el,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    }
  );
}
});

// Refresh les animations des textes
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

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