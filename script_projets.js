gsap.registerPlugin(ScrollTrigger);
const app = Vue.createApp({

  data() {
    return {
      // 
      projet: null,
    };
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    const projetId = params.get("id");

    fetch("projects.json")
      .then((r) => r.json())
      .then((data) => {
        this.projet = data.find(p => p.id == projetId);

        this.$nextTick(() => {
          // Attendre le chargement complet des images
        const images = document.querySelectorAll('img');
        let loaded = 0;
        if (images.length === 0) {
          this.initTextAnimations();
          return;
        }

        images.forEach(img => {
          if (img.complete) loaded++;
          else img.addEventListener('load', () => {
            loaded++;
            if (loaded === images.length) {
              this.initTextAnimations();
              setTimeout(() => ScrollTrigger.refresh(), 300);
            }
          });
        });

        if (loaded === images.length) {
          this.initTextAnimations();
          setTimeout(() => ScrollTrigger.refresh(), 300);
        }
        });
      });
  },
  methods: {
    // Pour revenir à la page d'accueil
    revenir() {
      window.location.href = "index.html";
    },

    initTextAnimations() {

      // Désactiver l'animation sur mobile
      if (window.innerWidth < 768) {
        const elements = gsap.utils.toArray([
          '.donnees',
          '.hero h2',
          '#objectif h2',
          '.objectif',
          '#processus h2',
          '.processus-content',
          '#processus img',
          '.button-voir',
          '.remerciements',
        ]);

        elements.forEach((el) => {
          if (el) {
            gsap.set(el, { opacity: 1, y: 0 });
          }
        });

        console.log("Animations GSAP désactivées sur mobile");
        return; 
      }

      if (!this.projet) return;

      const elements = gsap.utils.toArray([
        '.donnees',
        '.hero h2',
        '#objectif h2',
        '.objectif',
        '#processus h2',
        '.processus-content',
        '#processus img',
        '.button-voir',
        '.remerciements',
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

      ScrollTrigger.refresh();
    }
  }
});

const vm = app.mount('#app');

window.addEventListener("resize", () => ScrollTrigger.refresh());
window.addEventListener("orientationchange", () => ScrollTrigger.refresh());
