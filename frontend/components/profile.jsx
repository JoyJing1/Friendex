"use strict";

const React = require('react');
const Link = require('react-router').Link;
const ProfileStore = require('../stores/profile_store');
const ProfileActions = require('../actions/profile_actions');

const Profile = React.createClass({
  getInitialState() {
    return { profile: ProfileStore.getProfile() };
  },

  componentDidMount() {
    ProfileActions.fetchSingleProfile(this.props.params.id);
    ProfileStore.addListener(this._updateProfile);
  },

  _updateProfile(profile) {
    this.setState({ profile: ProfileStore.getProfile() });
    console.log("_updateProfile(profile) in profile.jsx");
    console.log(this.state);
  },

  render () {
    return (
      <div className="profile-page">

        <nav className="profile-nav clearfix">
          <img src={this.state.profile.background_img} className="background-img"/>
          <img src={this.state.profile.profile_img} className="profile-img"/>
          <h1>{this.state.profile.username}</h1>

          <nav className="profile-tabs">
            <Link to={`/users/${this.props.params.id}`}>Timeline</Link>
            <Link to={`/users/${this.props.params.id}`}>About</Link>
            <Link to={`/users/${this.props.params.id}`}>Friends</Link>
            <Link to={`/users/${this.props.params.id}`}>Photos</Link>
          </nav>
        </nav>

        <aside className="profile-left col-1-3">
          <div className="profile-about-sidebar">
            <ul>List of Attributes
              <li>{this.state.profile.first_name}</li>
              <li>{this.state.profile.last_name}</li>
              <li>{this.state.profile.birthday}</li>
              <li>{this.state.profile.email}</li>
              <li>{this.state.profile.workplace}</li>
              <li>{this.state.profile.profile_img}</li>
              <li>{this.state.profile.background_img}</li>
              <li>{this.state.profile.user_id}</li>
              <li>{this.state.profile.id}</li>
            </ul>
          </div>
        </aside>

        <main className="profile-main col-2-3">
          <ul>
            <li>This is where the PostIndex would go</li>
          </ul>
        </main>

        {this.props.children}
      </div>
    );
  }
});

module.exports = Profile;
