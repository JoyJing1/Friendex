"use strict";

const React = require('react');

const ProfileAbout   = require('./profile_about')
    , ProfileActions = require('../../actions/profile_actions')
    , ProfileHeader  = require('./profile_header')
    , ProfileStore   = require('../../stores/profile_store');

const ProfileAboutPage = React.createClass({
  getInitialState() {
    return { profile: ProfileStore.currentProfile() };
  },

  componentDidMount() {
    const id = parseInt(this.props.params.id);
    // console.log("componentDidMount() in profile_about_page.jsx");

    ProfileActions.fetchSingleProfile(id);
    this.profileListener = ProfileStore.addListener(this._updateProfile);
  },

  componentWillUnmount() {
    this.profileListener.remove();
  },

  componentWillReceiveProps(newProps) {
    ProfileActions.fetchSingleProfile(newProps.id);
  },

  _updateProfile(profile) {
    this.setState({ profile: ProfileStore.currentProfile() });
    // console.log("_updateProfile(profile) in profile.jsx");
  },

  render () {
    return (
      <div className="profile-about-full">

        <ProfileAbout profile={this.state.profile}/>

        {this.props.children}
      </div>
    );
  }
});

module.exports = ProfileAboutPage;
