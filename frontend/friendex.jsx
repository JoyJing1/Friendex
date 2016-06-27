const React = require('react'),
      ReactDOM = require('react-dom'),
      ReactRouter = require('react-router'),
      Router = require('react-router').Router,
      Route = require('react-router').Route,
      hashHistory = require('react-router').hashHistory;

const App = React.createClass({
  render () {
    return (
      <div>
        <h1>Welcome to Friendex!</h1>
        {this.props.children}
      </div>
    );
  }
});

const routes = (
  <Route path="/" component={App}>

  </Route>
);

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("content");
  ReactDOM.render(<Router history={hashHistory} routes={routes}/>, root);
});
