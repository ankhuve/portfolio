Vue.use(VueRouter);

// Define some components
var HomeComponent = Vue.extend({
    template: '#home',
    data: function(){
        return {
            active: false
        }
    },
    methods: {
        setActiveProject: function (event) {
            this.toggleActiveTile(event.currentTarget.id);
        },

        toggleActiveTile: function(id){
            $('#' + id).toggleClass('active-tile');
        }
    }
});

Vue.component('home-component', HomeComponent);

var about = Vue.extend({
    template: '#about'
});

var contact = Vue.extend({
    template: '#contact'
});

//Vue.component('home', home);

// The router needs a root component to render.
// For demo purposes, we will just use an empty one
// because we are using the HTML as the app template.
// !! Note that the App is not a Vue instance.
var App = Vue.extend({});

// Create a router instance.
// You can pass in additional options here, but let's
// keep it simple for now.
var router = new VueRouter();

// Define some routes.
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
router.map({
    '/': {
        component: HomeComponent
    },
    '/about': {
        component: about
    },
    '/contact': {
        component: contact
    }
});

router.start(App, '#vueApp');


//projectsRef = firebase.database.ref('projects');
var rootRef = firebase.database().ref();



var projectsSection = document.getElementById('test');

var currData;

var vm = new Vue({
    el: '#vueApp',
    data: {
            activeProject: false,
            projects: currData
        //{
        //    activeProject: false,
        //    // simple syntax, bind as an array by default
        //    projects: currData
        //    // can also bind to a query
        //    // anArray: new Firebase('url/to/my/collection').limitToLast(25)
        //    // full syntax
        //    //anObject: {
        //    //    source: new Firebase('https://portfolio-aa4ab.firebaseio.com/projects/ownit'),
        //    //    // optionally bind as an object
        //    //    asObject: true,
        //    //    // optionally provide the cancelCallback
        //    //    cancelCallback: function () {}
        //    //}
    },
    //components: {
    //    'my-component': HomeComponent
    //},
    methods: {
        getAllProjects: function(){
            firebase.database().ref('/projects/').limitToLast(25).once('value').then(function(snapshot) {
                var dataObj = snapshot.val();

                for (var proj in dataObj) {
                    if (dataObj.hasOwnProperty(proj)) {
                        console.log(dataObj[proj]);
                    }
                }

                this.projects = dataObj;
                //console.log(data);



                projectsSection.innerHTML = JSON.stringify(dataObj);
                // ...
            });
        }
    },
    events: {
        'dispatch-test': function(state) {
            this.activeProject = state;
            console.log("dispatch received");
        }
    }
});

firebase.database().ref('/projects/').limitToLast(25).once('value').then(function(snapshot) {
    var dataObj = snapshot.val();
    currData = dataObj;

    vm.$data.projects = currData;

    for (var prop in dataObj) {
        if (dataObj.hasOwnProperty(prop)) {
            console.log(dataObj[prop].title);
        }
    }

    //projectsSection.innerHTML = JSON.stringify(dataObj);
});