"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const NewsfeedIndex = require('./newsfeed_index');
const NewsfeedLeft = require('./newsfeed_left');
const NewsfeedRight = require('./newsfeed_right');

const Newsfeed = React.createClass({
  render() {
    return(
      <div className="newsfeed-container clearfix">

        <NewsfeedLeft />

        <main className="newsfeed-main">
          <NewsfeedIndex/>
        </main>

        <NewsfeedRight/>

        {this.props.children}
      </div>
    );
  }
});

module.exports = Newsfeed;
