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
  getInitialState() {
    return { newsfeed: NewsfeedStore.all(),
              currentUserProfile: SessionStore.currentUserProfile() };
  },

  componentDidMount() {
    console.log("componentDidMount() in newsfeed_index.jsx");
    const id = SessionStore.currentUser().id;
    NewsfeedActions.fetchNewsfeed(id);
    ProfileActions.fetchCurrentUserProfile();
    this.newsfeedListener = NewsfeedStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillReceiveProps(newProps) {
    console.log("componentWillReceiveProps(newProps) in newsfeed_index.jsx");
    const id = SessionStore.currentUser().id;
    NewsfeedActions.fetchNewsfeed(id);
    ProfileActions.fetchCurrentUserProfile();
  },

  componentWillUnmount() {
    this.newsfeedListener.remove();
    this.sessionListener.remove();
  },

  _onChange() {
    console.log("_onChange() in newsfeed_index.jsx");
    this.setState( { newsfeed: NewsfeedStore.all(),
                    currentUserProfile: SessionStore.currentUserProfile() }
                  );
  },

  render() {
    // const profile = {id: SessionStore.currentUser().id};
    return (
      <ul>
        <NewPostForm profile={this.state.currentUserProfile}/>

        { this.state.newsfeed.map( news => {
          return (
            <NewsfeedIndexItem news={news}
              key={news.type+news.id}
              currentUserProfile={this.state.currentUserProfile}/>
          );
        })}
      </ul>
    );
  }
});

module.exports = NewsfeedIndex;
