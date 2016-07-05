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
    return { newsfeed: NewsfeedStore.all() };
  },

  componentDidMount() {
    console.log("componentDidMount() in newsfeed_index.jsx");
    const id = SessionStore.currentUser().id;
    NewsfeedActions.fetchNewsfeed(id);
    this.newsfeedListener = NewsfeedStore.addListener(this._onChange);
  },

  componentWillReceiveProps(newProps) {
    const id = SessionStore.currentUser().id;
    NewsfeedActions.fetchNewsfeed(id);
  },

  componentWillUnmount() {
    this.newsfeedListener.remove();
  },

  _onChange() {
    this.setState( { newsfeed: NewsfeedStore.all() } );
    console.log("_onChange() in newsfeed_index.jsx");
    console.log(this.state);
  },

  render() {
    const profile = {id: SessionStore.currentUser().id};
    return (
      <ul>
        <NewPostForm profile={profile}/>

        { this.state.newsfeed.map( news => {
          return <NewsfeedIndexItem news={news} key={news.type+news.id}/>;
        })}
      </ul>
    );
  }
});

module.exports = NewsfeedIndex;
