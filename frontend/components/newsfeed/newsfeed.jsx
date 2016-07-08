"use strict";

const Link = require('react-router').Link
    , React = require('react');

const NewsfeedIndex = require('./newsfeed_index')
    , NewsfeedLeft = require('./newsfeed_left')
    , NewsfeedRight = require('./newsfeed_right')
    , SessionActions = require('../../actions/session_actions')
    , SessionStore = require('../../stores/session_store');

const Newsfeed = React.createClass({
  render() {
    return(
      <div className="newsfeed-container clearfix">

        <NewsfeedLeft/>

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
