export class App {
    configureRouter(config, router) {
        config.title = "Rembrandt";
        config.map([
            { route: [''], moduleId: './home', nav: true, title: 'Home' }
        ]);

        this.configureRouter = router;
    }
}