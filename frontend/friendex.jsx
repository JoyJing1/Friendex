// React
const React = require('react')
    , ReactDOM = require('react-dom');
// Router
const hashHistory = require('react-router').hashHistory
    , IndexRedirect = require('react-router').IndexRedirect
    , IndexRoute = require('react-router').IndexRoute
    , ReactRouter = require('react-router')
    , Route = require('react-router').Route
    , Router = require('react-router').Router;
//Authentication
const SessionActions = require('./actions/session_actions')
    , SessionStore = require('./stores/session_store');
// Components
const App = require('./components/app')
    , FriendsPage = require('./components/friend/friends_page')
    , LoginPage = require('./components/login/login_page')
    , Newsfeed = require('./components/newsfeed/newsfeed')
    , PhotosPage = require('./components/photo/photos_page')
    , ProfileAboutPage = require('./components/profile/profile_about_page')
    , ProfileHeader = require('./components/profile/profile_header')
    , ProfileTimeline = require('./components/profile/profile_timeline');

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
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }

  const root = document.getElementById("content");
  ReactDOM.render(appRouter, root);

  jQuery("time.timeago").timeago();
});
