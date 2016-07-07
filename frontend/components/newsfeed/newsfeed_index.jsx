"use strict";

const React = require('react');

const NewsfeedActions   = require('../../actions/newsfeed_actions')
    , NewsfeedIndexItem = require('./newsfeed_index_item')
    , NewsfeedStore     = require('../../stores/newsfeed_store')
    , NewPostForm       = require('../post/new_post_form')
    , PostStore         = require('../../stores/post_store')
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
    this.newsfeedListener = NewsfeedStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillReceiveProps(newProps) {
    console.log("componentWillReceiveProps(newProps) in newsfeed_index.jsx");
    console.log(newProps);
    const id = SessionStore.currentUser().id;
    // debugger;
    NewsfeedActions.fetchNewsfeed(id);
    ProfileActions.fetchCurrentUserProfile();
  },

  componentWillUnmount() {
    this.newsfeedListener.remove();
    this.sessionListener.remove();
  },

  _onChange() {
    // debugger;
    console.log("_onChange() in newsfeed_index.jsx");
    console.log("original state:");
    console.log(this.state);
    console.log("current state in NewsfeedStore.all():");
    console.log(NewsfeedStore.all());
    this.setState( { newsfeed: NewsfeedStore.all(),
                    currentUserProfile: SessionStore.currentUserProfile() }
                  );
    // debugger;
    console.log("After setState() in _onChange() in newsfeed_index.jsx:");
    console.log(this.state);
    // At this point of Flux cycl, has only 1 like
  },

  render() {
    console.log("rendering newsfeed_index.jsx");
    const profile = {id: SessionStore.currentUser().id};
    return (
      <ul>
        <NewPostForm profile={profile}/>

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
