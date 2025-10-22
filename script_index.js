gsap.registerPlugin(ScrollTrigger);
const app = Vue.createApp({

  data() {
    return {
      // Tableau qui va contenir les données
      projects: []
    };
  },
  mounted() {
    // C'est ici qu'on récupère (fetch) les donnée
    fetch("projects.json")
        .then((response) => response.json())
        .then((data) => {
        this.projects = data; 

        this.$nextTick(() => {
          this.initScrollAnimation(); // Section horizontal
          this.initTextAnimations(); // Devoilement vertical
        });
    });
  },
  methods: {
    voirPlus(project) {
        window.location.href = `projets.html?id=${project.id}`; // pages de projet
    },

    // Section horizontale
    initScrollAnimation() {
      const container = document.querySelector(".projets-container");
      if (!container) return;

      // Pour mobiles
      if (window.innerWidth < 400) {
        gsap.set(container, { xPercent: 0 });
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        return;
      }

      // Réinitialise les éventuels anciens ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Animation horizontale
      gsap.to(container, {
          xPercent: -80 * (container.children.length - 1),
          ease: "none",
          scrollTrigger: {
          trigger: ".projets",
          scrub: 1,  
          start: "top top",
          end: () => "+=" + (container.scrollWidth * 0.7), 
          invalidateOnRefresh: true, 
          },
      });
    },
  
    // Dévoilement vertical
    initTextAnimations() {
      
      // Désactiver l'animation sur mobile
      if (window.innerWidth < 768) {
      const elements = gsap.utils.toArray([
        '.name p:last-child',
        '.text-wrapper-projet',
        '.text-wrapper-propos',
        '.a-propos-content',
        '.text-wrapper-contact',
        '.contact p:first-of-type',
        '.donnees',
        '.hero h2',
        '#objectif h2',
        '.objectif',
        '#processus h2',
        '.processus-content',
      ]);

    elements.forEach((el) => {
      if (el) {
        gsap.set(el, { opacity: 1, y: 0 });
      }
    });

    console.log("Animations GSAP désactivées sur mobile");
    return; 
  }
      const elements = gsap.utils.toArray([
        '.name p:last-child',
        '.text-wrapper-projet',
        '.text-wrapper-propos',
        '.a-propos-content',
        '.text-wrapper-contact',
        '.contact p:first-of-type',
        '.donnees',
        '.hero h2',
        '#objectif h2',
        '.objectif',
        '#processus h2',
        '.processus-content',
        
      ]);

      elements.forEach((el) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Animation de superposition section Competences
      ScrollTrigger.create({
        trigger: "#a-propos", 
        start: "top top",
        end: "+=100%", 
      });

      // Force un refresh du layout GSAP une fois tout monté
      ScrollTrigger.refresh();
    },
  },
});

const vm = app.mount('.container');

// Refresh sur resize/orientation 
window.addEventListener("resize", () => {ScrollTrigger.refresh();});
window.addEventListener("orientationchange", () => {ScrollTrigger.refresh();});