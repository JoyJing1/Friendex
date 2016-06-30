"use strict";

const React = require('react');
const Link = require('react-router').Link;
const ProfileStore = require('../stores/profile_store');
const ProfileActions = require('../actions/profile_actions');
const ProfileAbout = require('./profile_about');

const ProfileHeader = React.createClass({
  getInitialState() {
    return { profile: ProfileStore.currentProfile() };
  },

  componentDidMount() {
    console.log("componentDidMount() in profile_header.jsx");
    const id = parseInt(this.props.params.id);
    ProfileActions.fetchSingleProfile(id);
    this.profileListener = ProfileStore.addListener(this._updateProfile);
  },

  componentWillUnmount() {
    this.profileListener.remove();
  },

  _updateProfile(profile) {
    this.setState({ profile: ProfileStore.currentProfile() });
    console.log("_updateProfile(profile) in profile_header.jsx");
  },

  render() {
    return(
      <header className="profile-nav clearfix">
        <img src={this.state.profile.background_img} className="background-img"/>
        <img src={this.state.profile.profile_img} className="profile-img"/>
        <h1>{this.state.profile.username}</h1>

        <nav className="profile-tabs">
          <Link to={`/users/${this.state.profile.user_id}/timeline`}>Timeline</Link>
          <Link to={`/users/${this.state.profile.user_id}/about`}>About</Link>
          <Link to={`/users/${this.state.profile.user_id}`}>Friends</Link>
          <Link to={`/users/${this.state.profile.user_id}`}>Photos</Link>
        </nav>
        {this.props.children}
      </header>
    );
  }
});

module.exports = ProfileHeader;
