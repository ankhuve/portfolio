//var Vue = require("vue");
//var VueFire = require("vuefire");
//var Firebase = require("firebase");
Vue.use(VueRouter);

// explicit installation is required in a module environment
//Vue.use(VueFire);



//var projectsSection = document.getElementById('project-grid');
//var signInButton = document.getElementById('login-button');
//
//
//
///**
// * Starts listening for new posts and populates posts lists.
// */
//function startDatabaseQueries() {
//    // [START recent_posts_query]
//    var recentPostsRef = firebase.database().ref('projects').limitToLast(100);
//    // [END recent_posts_query]
//
//    var fetchPosts = function(postsRef, sectionElement) {
//        postsRef.on('child_added', function(data) {
//            var containerElement = sectionElement.getElementsByClassName('projects-container');
//            containerElement.insertBefore(
//                createPostElement(data.key, data.val().title, data.val().body, data.val().author),
//                containerElement.firstChild);
//        });
//    };
//
//    fetchPosts(recentPostsRef, projectsSection);
//}
//
//
//function createPostElement(postId, title, text, author) {
//    var uid = firebase.auth().currentUser.uid;
//
//    var html =
//        '<div class="post mdl-cell mdl-cell--12-col ' +
//        'mdl-cell--6-col-tablet mdl-cell--4-col-desktop mdl-grid mdl-grid--no-spacing">' +
//        '<div class="mdl-card mdl-shadow--2dp">' +
//        '<div class="mdl-card__title mdl-color--light-blue-600 mdl-color-text--white">' +
//        '<h4 class="mdl-card__title-text"></h4>' +
//        '</div>' +
//        '<div class="header">' +
//        '<div>' +
//        '<div class="avatar"></div>' +
//        '<div class="username mdl-color-text--black"></div>' +
//        '</div>' +
//        '</div>' +
//        '<span class="star">' +
//        '<div class="not-stared material-icons">star_border</div>' +
//        '<div class="stared material-icons">star</div>' +
//        '<div class="star-count">0</div>' +
//        '</span>' +
//        '<div class="text"></div>' +
//        '<div class="comments-container"></div>' +
//        '<form class="add-comment" action="#">' +
//        '<div class="mdl-textfield mdl-js-textfield">' +
//        '<input class="mdl-textfield__input new-comment" type="text">' +
//        '<label class="mdl-textfield__label">Comment...</label>' +
//        '</div>' +
//        '</form>' +
//        '</div>' +
//        '</div>';
//
//    // Create the DOM element from the HTML.
//    var div = document.createElement('div');
//    div.innerHTML = html;
//    var postElement = div.firstChild;
//    componentHandler.upgradeElements(postElement.getElementsByClassName('mdl-textfield')[0]);
//
//    var addCommentForm = postElement.getElementsByClassName('add-comment')[0];
//    var commentInput = postElement.getElementsByClassName('new-comment')[0];
//    var star = postElement.getElementsByClassName('stared')[0];
//    var unStar = postElement.getElementsByClassName('not-stared')[0];
//
//    // Set values.
//    postElement.getElementsByClassName('text')[0].innerText = text;
//    postElement.getElementsByClassName('mdl-card__title-text')[0].innerText = title;
//    postElement.getElementsByClassName('username')[0].innerText = author;
//
//    // Listen for comments.
//    // [START child_event_listener_recycler]
//    var commentsRef = firebase.database().ref('post-comments/' + postId);
//    commentsRef.on('child_added', function(data) {
//        addCommentElement(postElement, data.key, data.val().text, data.val().author);
//    });
//
//    commentsRef.on('child_changed', function(data) {
//        setCommentValues(postElement, data.key, data.val().text, data.val().author);
//    });
//
//    commentsRef.on('child_removed', function(data) {
//        deleteComment(postElement, data.key);
//    });
//    // [END child_event_listener_recycler]
//
//    // Listen for likes counts.
//    // [START post_value_event_listener]
//    firebase.database().ref('posts/' + postId + '/starCount').on('value', function(snapshot) {
//        updateStarCount(postElement, snapshot.val());
//    });
//    // [END post_value_event_listener]
//
//    // Listen for the stared status.
//    firebase.database().ref('posts/' + postId + '/stars/' + uid).on('value', function(snapshot) {
//        updateStarredByCurrentUser(postElement, snapshot.val());
//    });
//
//    // Create new comment.
//    addCommentForm.onsubmit = function(e) {
//        e.preventDefault();
//        createNewComment(postId, firebase.auth().currentUser.displayName, uid, commentInput.value);
//        commentInput.value = '';
//        commentInput.parentElement.MaterialTextfield.boundUpdateClassesHandler();
//    };
//
//    // Bind starring action.
//    var onStarClicked = function() {
//        var globalPostRef = firebase.database().ref('/posts/' + postId);
//        var userPostRef = firebase.database().ref('/user-posts/' + uid + '/' + postId);
//        toggleStar(globalPostRef, uid);
//        toggleStar(userPostRef, uid);
//    };
//    unStar.onclick = onStarClicked;
//    star.onclick = onStarClicked;
//
//    return postElement;
//}
//
//
//// Bindings on load.
//window.addEventListener('load', function() {
//    // Bind Sign in button.
//    signInButton.addEventListener('click', function() {
//        var provider = new firebase.auth.GoogleAuthProvider();
//        firebase.auth().signInWithPopup(provider);
//    });
//
//    // Listen for auth state changes
//    firebase.auth().onAuthStateChanged(function(user) {
//        if (user) {
//            splashPage.style.display = 'none';
//            writeUserData(user.uid, user.displayName, user.email);
//            startDatabaseQueries();
//        } else {
//            splashPage.style.display = 'block';
//        }
//    });
//
//    // // Saves message on form submit.
//    // messageForm.onsubmit = function(e) {
//    //     e.preventDefault();
//    //     if (messageInput.value && titleInput.value) {
//    //         var postText = messageInput.value;
//    //         messageInput.value = '';
//    //         // [START single_value_read]
//    //         var userId = firebase.auth().currentUser.uid;
//    //         firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//    //             var username = snapshot.val().username;
//    //             // [START_EXCLUDE]
//    //             writeNewPost(firebase.auth().currentUser.uid, firebase.auth().currentUser.displayName,
//    //                 titleInput.value, postText).then(function() {
//    //                 myPostsMenuButton.click();
//    //             });
//    //             // [END_EXCLUDE]
//    //         });
//    //         // [END single_value_read]
//    //     }
//    // };
//
//}, false);
//
