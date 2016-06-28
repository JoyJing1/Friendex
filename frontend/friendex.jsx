// React
const React = require('react');
const ReactDOM = require('react-dom');
// Router
const ReactRouter = require('react-router');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const hashHistory = require('react-router').hashHistory;
//Authentication
const SessionStore = require('./stores/session_store');
const SessionActions = require('./actions/session_actions');
// Components
const App = require('./components/app');
const LoginForm = require('./components/login_form');
const Profile = require('./components/profile');

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <Route path="/users/:id" component={ Profile }/>

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
