"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const NewsfeedIndex = require('./newsfeed_index');

const Newsfeed = React.createClass({
  render() {
    return(
      <div className="newsfeed-container clearfix">

        <aside className="newsfeed-left">
          <h5>Left Sidebar</h5>
        </aside>

        <main className="newsfeed-main">
          <NewsfeedIndex/>
        </main>


        <aside className="newsfeed-right">
          <h5>Right Sidebar</h5>
        </aside>

        {this.props.children}
      </div>
    );
  }
});

module.exports = Newsfeed;
