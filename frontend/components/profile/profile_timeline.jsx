"use strict";

const Link = require('react-router').Link
, React    = require('react');

const PostIndex      = require('../post//post_index')
    , ProfileAbout   = require('./profile_about')
    , ProfileActions = require('../../actions/profile_actions')
    , ProfileHeader  = require('./profile_header')
    , ProfileStore   = require('../../stores/profile_store')
    , SessionStore   = require('../../stores/session_store')
    , NewPostForm    = require('../post/new_post_form');

const ProfileTimeline = React.createClass({
  getInitialState() {
    return { profile: ProfileStore.currentProfile(),
             currentUserProfile: SessionStore.currentUserProfile() };
  },

  componentDidMount() {
    ProfileActions.fetchSingleProfile(this.props.params.id);
    this.profileListener = ProfileStore.addListener(this._onChange);
    // this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    this.profileListener.remove();
    // this.sessionListener.remove();
  },

  _onChange(profile) {
    this.setState({ profile: ProfileStore.currentProfile(),
                    currentUserProfile: SessionStore.currentUserProfile() });
    // console.log("_onChange(profile) in profile.jsx");
  },

  render () {
    return (
      <div className="profile-page">

      <div className="profile-body">
          <aside className="profile-left col-1-3">
            <div className="profile-about-sidebar clearfix">

              <ProfileAbout profile={this.state.profile}/>

            </div>
          </aside>

          <main className="profile-main col-2-3 clearfix">
            <div className="profile-main-posts">

              <NewPostForm profile={this.state.profile}
                  currentUserProfile={this.state.currentUserProfile}/>

              <PostIndex profile={this.state.profile}
                  currentUserProfile={this.state.currentUserProfile}/>

            </div>
          </main>
        </div>

        {this.props.children}
      </div>
    );
  }
});

module.exports = ProfileTimeline;
