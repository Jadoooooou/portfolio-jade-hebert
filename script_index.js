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
      
      // Désactiver l'animation sur mobile
      if (window.innerWidth < 768) { // Si l'écran est moins de 768px
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
    },
  },
});

const vm = app.mount('.container');

// Refresh sur resize/orientation 
window.addEventListener("resize", () => {ScrollTrigger.refresh();});
window.addEventListener("orientationchange", () => {ScrollTrigger.refresh();});