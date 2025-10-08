gsap.registerPlugin(ScrollTrigger);

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
  '.contact p:first-of-type',
  '.contact p:last-of-type'
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
