// React
const React = require('react');
const ReactDOM = require('react-dom');
// Router
const hashHistory = require('react-router').hashHistory;
const IndexRedirect = require('react-router').IndexRedirect;
const IndexRoute = require('react-router').IndexRoute;
const ReactRouter = require('react-router');
const Route = require('react-router').Route;
const Router = require('react-router').Router;
//Authentication
const SessionActions = require('./actions/session_actions');
const SessionStore = require('./stores/session_store');



// Components
const App = require('./components/app');
const FriendsPage = require('./components/friend/friends_page');
const LoginPage = require('./components/login/login_page');
const Newsfeed = require('./components/newsfeed/newsfeed');
const PhotosPage = require('./components/photo/photos_page');
const ProfileAboutPage = require('./components/profile/profile_about_page');
const ProfileHeader = require('./components/profile/profile_header');
const ProfileTimeline = require('./components/profile/profile_timeline');

// Test/access NewsfeedStore from window;
// window.NewsfeedStore = require("./stores/newsfeed_store");


const _ensureLoggedIn = function( _ , replace) {
  if (!SessionStore.isUserLoggedIn()) {
    replace("login");
  }
};

const _autoLogin = function( _ , replace) {
  if (SessionStore.isUserLoggedIn()) {
    replace("/");
  }
};

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App } >
      <IndexRoute component={ Newsfeed } onEnter={_ensureLoggedIn}/>
      <Route path="login" component={ LoginPage } onEnter={_autoLogin}/>
      <Route path="/users/:id" component={ ProfileHeader } onEnter={_ensureLoggedIn}>
        <IndexRedirect to="/users/:id/timeline" component={ ProfileTimeline }/>
        <Route path="timeline" component={ ProfileTimeline }/>
        <Route path="about" component={ ProfileAboutPage } onEnter={_ensureLoggedIn}/>
        <Route path="friends" component={ FriendsPage } onEnter={_ensureLoggedIn}/>
        <Route path="photos" component={ PhotosPage } onEnter={_ensureLoggedIn}/>
      </Route>
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }

  const root = document.getElementById("content");
  ReactDOM.render(appRouter, root);

  jQuery("time.timeago").timeago();

});
