"use strict";

const React = require('react');

const Header          = require('./header')
    , SessionStore    = require('../stores/session_store');


const App = React.createClass({
  render () {
    if (SessionStore.isUserLoggedIn()) {
      return(
        <div className="app-container">
          <Header/>
          {this.props.children}
        </div>
      );
    } else {
      return(
        <div className="app-container">
          {this.props.children}
        </div>
      );
    }
  }
});

module.exports = App;
