//Vue.use(VueRouter);
//
//// Define some components
//var HomeComponent = Vue.extend({
//    template: '#home',
//    methods: {
//        setActiveProject: function () {
//            console.log('dispatched');
//            this.$dispatch('setActiveProject', true);
//            //this.activeProject = true;
//
//        }
//    }
//});
//
////Vue.component('home-component', HomeComponent);
//
//var about = Vue.extend({
//    template: '#about'
//});
//
//var contact = Vue.extend({
//    template: '#contact'
//});
//
////Vue.component('home', home);
//
//// The router needs a root component to render.
//// For demo purposes, we will just use an empty one
//// because we are using the HTML as the app template.
//// !! Note that the App is not a Vue instance.
//var App = Vue.extend({});
//
//// Create a router instance.
//// You can pass in additional options here, but let's
//// keep it simple for now.
//var router = new VueRouter();
//
//// Define some routes.
//// Each route should map to a component. The "component" can
//// either be an actual component constructor created via
//// Vue.extend(), or just a component options object.
//// We'll talk about nested routes later.
//router.map({
//    '/': {
//        component: HomeComponent
//    },
//    '/about': {
//        component: about
//    },
//    '/contact': {
//        component: contact
//    }
//});
//
//router.start(App, '#vueApp');