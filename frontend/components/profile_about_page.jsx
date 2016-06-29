"use strict";

const React = require('react');
// const Link = require('react-router').Link;
const ProfileStore = require('../stores/profile_store');
const ProfileActions = require('../actions/profile_actions');
const ProfileAbout = require('./profile_about');
const ProfileHeader = require('./profile_header');

const ProfileAboutPage = React.createClass({
  getInitialState() {
    return { profile: ProfileStore.getProfile() };
  },

  componentDidMount() {
    const id = parseInt(this.props.params.id);
    console.log("componentDidMount() in profile_about_page.jsx");
    console.log(id);
    // debugger;
    ProfileActions.fetchSingleProfile(id);
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
      <div className="profile-about-full">

        <ProfileAbout profile={this.state.profile}/>

        {this.props.children}
      </div>
    );
  }
});

module.exports = ProfileAboutPage;
