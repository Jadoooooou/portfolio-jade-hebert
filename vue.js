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
            .then((response) => {
                return response.json(); // conversion en JSON
            })
            .then((data) => {
                this.projects = data; // stockage des projets
            })
            .catch((error) => {
                console.log("Erreur"); // si FETCH n'a pas marché
            });
    },
    methods: {
        voirPlus(project) {
            window.location.href = project.link; // pages de projet
        },
    }
});

const vm = app.mount('.projets-container');