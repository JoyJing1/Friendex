"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const Profile = React.createClass({
  render () {
    return (
      <div className="profile-page">
        <h1>Welcome to your profile page</h1>

        {this.props.children}
      </div>
    );
  }
});

module.exports = Profile;
