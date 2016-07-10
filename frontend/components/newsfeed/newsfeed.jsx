"use strict";

const Link = require('react-router').Link
    , React = require('react');

const NewsfeedActions = require('../../actions/newsfeed_actions')
    , NewsfeedIndex = require('./newsfeed_index')
    , NewsfeedLeft = require('./newsfeed_left')
    , NewsfeedRight = require('./newsfeed_right')
    , NewsfeedStore     = require('../../stores/newsfeed_store')
    , ProfileActions   = require('../../actions/profile_actions')
    , SessionActions = require('../../actions/session_actions')
    , SessionStore = require('../../stores/session_store');

const Newsfeed = React.createClass({
  getInitialState() {
    return { newsfeed: NewsfeedStore.all(),
            currentUserProfile: SessionStore.currentUserProfile() };
  },

  componentDidMount() {
    const id = SessionStore.currentUser().id;
    NewsfeedActions.fetchNewsfeed(id);
    ProfileActions.fetchCurrentUserProfile();
    this.newsfeedListener = NewsfeedStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    this.newsfeedListener.remove();
    this.sessionListener.remove();
  },

  componentWillReceiveProps(newProps) {
    // console.log("componentWillReceiveProps(newProps) in newsfeed_index.jsx");
    const id = SessionStore.currentUser().id;
    NewsfeedActions.fetchNewsfeed(id);
    ProfileActions.fetchCurrentUserProfile();
  },

  _onChange() {
    // const currentUserProfile = SessionStore.currentUserProfile();
    this.setState( { newsfeed: NewsfeedStore.all(),
                      currentUserProfile: SessionStore.currentUserProfile() } );
  },

  render() {
    return(
      <div className="newsfeed-container clearfix">

        <NewsfeedLeft currentUserProfile={this.state.currentUserProfile}/>

        <main className="newsfeed-main">
          <NewsfeedIndex newsfeed={this.state.newsfeed} currentUserProfile={this.state.currentUserProfile}/>
        </main>

        <NewsfeedRight/>

        {this.props.children}
      </div>
    );
  }
});

module.exports = Newsfeed;
