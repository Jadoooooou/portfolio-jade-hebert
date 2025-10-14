const app = Vue.createApp({

    data() {
        return {
            message: "Chargement..."
        };
    },
    mounted() {
        console.log("L'app Vue a été créée et montée au DOM (mounted) !");

        this.message = "Vue a été chargé et montée au DOM (mounted) !";

        // C'est ici qu'on récupère (fetch) les données, qu'on manipule le DOM ou qu'on itinitialise des librairies
    },
    methods: {
        // ...
    }
});

app.mount('#menu');