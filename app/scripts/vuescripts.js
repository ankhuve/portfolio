//projectsRef = firebase.database.ref('projects');
var rootRef = firebase.database().ref();

var projectsSection = document.getElementById('test');

var currData;

var vm = new Vue({
    el: '#demo',
    data: {
        // simple syntax, bind as an array by default
        projects: currData
        // can also bind to a query
        // anArray: new Firebase('url/to/my/collection').limitToLast(25)
        // full syntax
        //anObject: {
        //    source: new Firebase('https://portfolio-aa4ab.firebaseio.com/projects/ownit'),
        //    // optionally bind as an object
        //    asObject: true,
        //    // optionally provide the cancelCallback
        //    cancelCallback: function () {}
        //}
    },
    methods: {
        getAllProjects: function(){
            firebase.database().ref('/projects/').limitToLast(25).once('value').then(function(snapshot) {
                var dataObj = snapshot.val();

                for (var prop in dataObj) {
                    if (dataObj.hasOwnProperty(prop)) {
                        console.log(dataObj[prop].title);
                    }
                }

                this.projects = dataObj;
                //console.log(data);



                projectsSection.innerHTML = JSON.stringify(dataObj);
                // ...
            });
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