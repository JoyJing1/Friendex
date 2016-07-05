"use strict";

const Link = require('react-router').Link
, React    = require('react');

const PostIndex      = require('../post//post_index')
    , ProfileAbout   = require('./profile_about')
    , ProfileActions = require('../../actions/profile_actions')
    , ProfileHeader  = require('./profile_header')
    , ProfileStore   = require('../../stores/profile_store')
    , NewPostForm    = require('../post/new_post_form');

const ProfileTimeline = React.createClass({
  getInitialState() {
    return { profile: ProfileStore.currentProfile() };
  },

  componentDidMount() {
    ProfileActions.fetchSingleProfile(this.props.params.id);
    this.profileListener = ProfileStore.addListener(this._updateProfile);
  },

  componentWillUnmount() {
    this.profileListener.remove();
  },

  _updateProfile(profile) {
    this.setState({ profile: ProfileStore.currentProfile() });
    console.log("_updateProfile(profile) in profile.jsx");
    console.log(this.state);
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

              <NewPostForm profile={this.state.profile}/>

              <PostIndex profile={this.state.profile}/>

            </div>
          </main>
        </div>

        {this.props.children}
      </div>
    );
  }
});

module.exports = ProfileTimeline;
