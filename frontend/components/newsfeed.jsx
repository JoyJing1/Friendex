"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const Newsfeed = React.createClass({
  render() {
    return(
      <div className="header-main clearfix">
        <h1>This is the Newsfeed</h1>

      </div>
    );
  }
});

module.exports = Newsfeed;
