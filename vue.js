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
                this.initScrollAnimation(); // ⚡ Initialise GSAP
        });
      });
    },
    methods: {
        voirPlus(project) {
            window.location.href = project.link; // pages de projet
        },

       initScrollAnimation() {
      gsap.registerPlugin(ScrollTrigger);

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
          start: "top 10%",
          end: () => "+=" + (container.scrollWidth * 0.7), // durée du scroll
          invalidateOnRefresh: true, // recalcul automatique en cas de resize
        },
      });
    },
  },
});

const vm = app.mount('.projets-container');