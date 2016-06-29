// React
const React = require('react');
const ReactDOM = require('react-dom');
// Router
const ReactRouter = require('react-router');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
const hashHistory = require('react-router').hashHistory;
//Authentication
const SessionStore = require('./stores/session_store');
const SessionActions = require('./actions/session_actions');
// Components
const App = require('./components/app');
const LoginPage = require('./components/login_page');
const Profile = require('./components/profile');
const Newsfeed = require('./components/newsfeed');

// Redirect to login page if user not logged in
// Otherwise, send to profile page

const _ensureLoggedIn = function( _ , replace) {
  if (!SessionStore.isUserLoggedIn()) {
    replace("login");
  }
};

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App } >
      <IndexRoute component={ Newsfeed } onEnter={_ensureLoggedIn}/>
      <Route path="login" component={ LoginPage }/>
      <Route path="/users/:id" component={ Profile } onEnter={_ensureLoggedIn}/>
    </Route>
  </Router>
);



document.addEventListener("DOMContentLoaded", () => {
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }

  const root = document.getElementById("content");
  ReactDOM.render(appRouter, root);
});
