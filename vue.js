gsap.registerPlugin(ScrollTrigger);
const app = Vue.createApp({

    data() {
        return {
            projects: [], // Tableau qui va contenir les données
        };
    },
    mounted() {
        console.log("L'app Vue a été créée et montée au DOM (mounted) !");

        // C'est ici qu'on récupère (fetch) les donnée
        fetch("projects.json")
            .then((response) => response.json())// conversion en JSON
            .then((data) => {
            this.projects = data; // stockage des projets

            this.$nextTick(() => {
                this.initScrollAnimation(); // section horizontal
                this.initTextAnimations(); // devoilement des textes
        });
      });
    },
    methods: {
        voirPlus(project) {
            window.location.href = project.link; // pages de projet
        },

        // section horizontale
        initScrollAnimation() {

            const container = document.querySelector(".projets-container");
            if (!container) return;

            // Réinitialise les éventuels anciens ScrollTrigger
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

            // Animation horizontale
            gsap.to(container, {
                xPercent: -80 * (container.children.length - 1),
                ease: "none",
                scrollTrigger: {
                trigger: ".projets",
                pin: true, // fige la section pendant le scroll
                scrub: 1,  // synchronise l’animation avec le scroll
                start: "top top",
                end: () => "+=" + (container.scrollWidth * 0.7), // durée du scroll
                invalidateOnRefresh: true, // recalcul automatique en cas de resize
                },
            });
        },
// Dévoilement des textes au scroll
    initTextAnimations() {
      const elements = gsap.utils.toArray([
        '.name p:last-child',
        '.text-wrapper-projet',
        '.text-wrapper-propos',
        '.a-propos-content',
        '.text-wrapper-contact',
        '.contact p:first-of-type',
        '.moi p',
        '.competences-content h2',
        '.competences-content p',
      ]);

      elements.forEach((el) => {
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
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Force un refresh du layout GSAP une fois tout monté
      ScrollTrigger.refresh();
    },
  },
});

const vm = app.mount('.projets-container');