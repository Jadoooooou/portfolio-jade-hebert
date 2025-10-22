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
          this.initTextAnimations();
        });
      });
  },
  methods: {
    // Pour revenir à la page d'accueil
    revenir() {
      window.location.href = "index.html";
    },

    initTextAnimations() {
      if (!this.projet) return;

      const elements = gsap.utils.toArray([
        '.donnees',
        '.hero h2',
        '#objectif h2',
        '.objectif',
        '#processus h2',
        '.processus-content',
      ]);

      elements.forEach((el) => {
        if (el) {
          gsap.fromTo(el,
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

      ScrollTrigger.refresh();
    }
  }
});

const vm = app.mount('#app');

window.addEventListener("resize", () => ScrollTrigger.refresh());
window.addEventListener("orientationchange", () => ScrollTrigger.refresh());
