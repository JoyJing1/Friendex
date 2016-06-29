"use strict";

const React = require('react');
const Link = require('react-router').Link;
const ProfileStore = require('../stores/profile_store');
const ProfileActions = require('../actions/profile_actions');
const ProfileAbout = require('./profile_about');
const ProfileHeader = require('./profile_header');

const ProfileTimeline = React.createClass({
  getInitialState() {
    return { profile: ProfileStore.getProfile() };
  },

  componentDidMount() {
    ProfileActions.fetchSingleProfile(this.props.params.id);
    this.profileListener = ProfileStore.addListener(this._updateProfile);
  },

  componentWillUnmount() {
    this.profileListener.remove();
  },

  _updateProfile(profile) {
    this.setState({ profile: ProfileStore.getProfile() });
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
            <ul>
              <li>This is where the PostIndex would go</li>
            </ul>
          </main>
        </div>

        {this.props.children}
      </div>
    );
  }
});

module.exports = ProfileTimeline;


// <ProfileHeader profile={this.state.profile}/>
