gsap.registerPlugin(ScrollTrigger);
const app = Vue.createApp({

  data() {
    return {
      // Retourne le tableau qui contient les données de départ vide
      projet: null,
    };
  },
  mounted() {
    // Affiche un projet précis selon son  ID et charge dynamiquement les données JSON
    const params = new URLSearchParams(window.location.search);
    const projetId = params.get("id");

    // C'est ici qu'on récupère (fetch) les donnée
    fetch("projects.json")
      .then((response) => response.json())
      .then((data) => {
        // Récupère les données (date) seulon le ID du projet
        this.projet = data.find(p => p.id == projetId);

        // Attends que le DOM soit mis à jour avant d’exécuter le code suivant
        this.$nextTick(() => {

        // Attend le chargement complet des images
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

        // Si toutes les images sont chargées l'animations de texte se lance
        if (loaded === images.length) {
          // Animation de textes par ScrollTrigger
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

    // Pour voir les projet selon le lein dans le fichier JSON dans un nouvel onglet
    voirProjet() {
      window.open(this.projet.link, "_blank");
    },

    // Animation de textes par ScrollTrigger
    initTextAnimations() {
      // Désactiver l'animation sur mobile
      if (window.innerWidth < 768) { // Si l'écran est moins de 768px
        // Liste des éléments qui ont l'animation
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

        // console.log("Animations GSAP désactivées sur mobile");
        return; 
      }

      // Liste des éléments qui ont l'animation
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

      // Animations pour chacun
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
                start: "top 90%", // Quand l'animation se déclanche
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Force un refresh du layout GSAP une fois tout monté
      ScrollTrigger.refresh();
    }
  }
});

const vm = app.mount('#app');

// Refresh sur resize/orientation
window.addEventListener("resize", () => ScrollTrigger.refresh());
window.addEventListener("orientationchange", () => ScrollTrigger.refresh());
