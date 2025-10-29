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
        // Si l'élément est déjà visible dans le viewport => le montrer immédiatement
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        // Et désactiver l'animation sur mobile (écran de moins de 768)
        if (isVisible && window.innerWidth < 768) {gsap.set(el, { opacity: 1, y: 0 }); return;}
  
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 }, 
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            immediateRender: false, // N'applique pas l'état initial trop tôt
            scrollTrigger: {
              trigger: el,
              start: "top bottom", // Quand l'animation se déclanche (ente dans le viewport)
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,  // Recalculer si ScrollTrigger refresh
            },
          }
        );
      });

      // Force un refresh une fois les animations créées
      ScrollTrigger.refresh();
    },
  }
});

const vm = app.mount('#app');

// Refresh sur resize/orientation
window.addEventListener("resize", () => ScrollTrigger.refresh());
window.addEventListener("orientationchange", () => ScrollTrigger.refresh());
