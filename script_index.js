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
          this.initTextAnimations(); // Devoilement vertical
          this.initParallax(); // Parallax 3D
        });
    });
  },
  methods: {
    
    voirPlus(project) {
      // Envoi l'utilisateur sur la page Projets en chargeant les données propre au projet en récupérant le paramètre URL
      window.location.href = `projets.html?id=${project.id}`; // pages de projet
    },

    initParallax() {
      const cards = document.querySelectorAll('.projet img')
      
      cards.forEach(card => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,  // lié directement au scroll
            onUpdate: (self) => {
              //console.log('progress:', self.progress) // ← doit changer en scrollant
              // progress : 0 (carte en bas) → 0.5 (centre écran) → 1 (carte en haut)
              const offset = (self.progress - 0.5) * 2
              const shadowBlur = 20 + Math.abs(offset) * 40
              const shadowOpacity = 0.1 + Math.abs(offset) * 0.3

              card.style.boxShadow = `0 0 ${shadowBlur}px ${shadowBlur * 0.3}px rgba(0,0,0,${shadowOpacity})`
            }
          }
        })
      })
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