"use strict";

const React = require('react');

const NewsfeedActions   = require('../../actions/newsfeed_actions')
    , NewsfeedIndexItem = require('./newsfeed_index_item')
    , NewsfeedStore     = require('../../stores/newsfeed_store')
    , NewPostForm       = require('../post/new_post_form')
    , PostStore         = require('../../stores/post_store')
    , ProfileActions    = require('../../actions/profile_actions')
    , SessionStore      = require('../../stores/session_store');

const NewsfeedIndex = React.createClass({
  render() {
    return (
      <ul>
        <NewPostForm profile={this.props.currentUserProfile}
            currentUserProfile={this.props.currentUserProfile}/>

          { this.props.newsfeed.map( news => {
          return (
            <NewsfeedIndexItem news={news}
              key={`${news.type}-${news.id}`}
              currentUserProfile={this.props.currentUserProfile}/>
          );
        })}
      </ul>
    );
  }
});

module.exports = NewsfeedIndex;
