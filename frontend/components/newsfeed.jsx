"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const Newsfeed = React.createClass({
  render() {
    return(
      <div className="newsfeed-container clearfix">
        <h4>This is the Newsfeed</h4>

        {this.props.children}
      </div>
    );
  }
});

module.exports = Newsfeed;
