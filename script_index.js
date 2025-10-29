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

        // Attends que le DOM soit mis à jour avant d’exécuter le code suivant
        this.$nextTick(() => {
          this.initSwiper(); // Section horizontal des projets
          this.initTextAnimations(); // Devoilement vertical
        });
    });
  },
  methods: {
    
    voirPlus(project) {
      // Envoi l'utilisateur sur la page Projets en chargeant les données propre au projet en récupérant le paramètre URL
      window.location.href = `projets.html?id=${project.id}`; // pages de projet
    },

    // Section horizontale des projets
    initSwiper() {
      const container = document.querySelector(".projets-container");
      if (!container) return;  // S'il n'y pas de .projets-container, n'applique pas le reste de la fonction

      // Pour mobiles
      if (window.innerWidth < 400) { // Si l'écran est moins de 400px
        gsap.set(container, { xPercent: 0 }); // Désactive GSAP
        ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Enlève les ScrollTriggers
        return;
      }

      // Créer le swiper sur le container
      const projetsSwiper = new Swiper('.projets-container', {
        slidesPerView: 'auto',
        spaceBetween: 8,
        grabCursor: true, // Le curseur affiche une main qui aggripe
        mousewheel: {
          forceToAxis: true,
        },
      });
    },
  
    // Dévoilement vertical
    initTextAnimations() {

      // Liste des éléments qui ont l'animation
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
  },
});

const vm = app.mount('.container');

// Refresh sur resize/orientation 
window.addEventListener("resize", () => {ScrollTrigger.refresh();});
window.addEventListener("orientationchange", () => {ScrollTrigger.refresh();});