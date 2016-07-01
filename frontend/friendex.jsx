// React
const React = require('react');
const ReactDOM = require('react-dom');
// Router
const ReactRouter = require('react-router');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
const IndexRedirect = require('react-router').IndexRedirect;
const hashHistory = require('react-router').hashHistory;
//Authentication
const SessionStore = require('./stores/session_store');
const SessionActions = require('./actions/session_actions');
// Components
const App = require('./components/app');
const LoginPage = require('./components/login_page');
const ProfileTimeline = require('./components/profile_timeline');
const ProfileHeader = require('./components/profile_header');
const ProfileAboutPage = require('./components/profile_about_page');
const FriendsPage = require('./components/friends_page');
const Newsfeed = require('./components/newsfeed');

// Redirect to login page if user not logged in
// Otherwise, send to profile page
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
      <Route path="login" component={ LoginPage } onEnter={_autoLogin}/>
      <Route path="/users/:id" component={ ProfileHeader } onEnter={_ensureLoggedIn}>
        <IndexRedirect to="/users/:id/timeline" component={ ProfileTimeline }/>
        <Route path="timeline" component={ ProfileTimeline }/>
        <Route path="about" component={ ProfileAboutPage } onEnter={_ensureLoggedIn}/>
        <Route path="friends" component={ FriendsPage } onEnter={_ensureLoggedIn}/>
      </Route>
    </Route>
  </Router>
);
// <IndexRoute component={ ProfileTimeline } onEnter={_ensureLoggedIn}/>
// <IndexRoute component={ ProfileTimeline } onEnter={_ensureLoggedIn}/>
// <IndexRedirect to="/users/:id/timeline" component={ ProfileTimeline }/>

document.addEventListener("DOMContentLoaded", () => {
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }

  const root = document.getElementById("content");
  ReactDOM.render(appRouter, root);

  // timeago plugin to render time ago in strings
  // jQuery(document).ready(function() {
  jQuery("time.timeago").timeago();
  // });
});
