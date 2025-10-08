gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector(".projets-container");

// Animation Horizontale
gsap.to(container, {
  xPercent: -80 * (container.children.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".projets",
    pin: true, // fige la section pendant le scroll
    scrub: 1,  // synchronise l’animation avec le scroll
    end: () => "+=" + (container.scrollWidth * 0.7), // durée du scroll
    invalidateOnRefresh: true, // recalcul automatique en cas de resize
  }
});

const elements = gsap.utils.toArray([
  // Section Hero
  '.portfolio',
  '.name p:first-child',
  '.name p:last-child',
  // Section Projets
  '.text-wrapper-projet',
  '.projet button',
  // Section À propos
  '.text-wrapper-propos',
  '.a-propos-content',
  '.a-propos button',
  // Section Contacts
  '.text-wrapper-contact',
  '.contact p:first-of-type'
]);

elements.forEach((el) => {
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
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    }
  );
});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
