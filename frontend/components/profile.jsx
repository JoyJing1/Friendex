"use strict";

const React = require('react');
const Link = require('react-router').Link;
const ProfileStore = require('../stores/profile_store');
const ProfileActions = require('../actions/profile_actions');
const ProfileAbout = require('./profile-about');

const Profile = React.createClass({
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

        <header className="profile-nav clearfix">
          <img src={this.state.profile.background_img} className="background-img"/>
          <img src={this.state.profile.profile_img} className="profile-img"/>
          <h1>{this.state.profile.username}</h1>

          <nav className="profile-tabs">
            <Link to={`/users/${this.props.params.id}`}>Timeline</Link>
            <Link to={`/users/${this.props.params.id}`}>About</Link>
            <Link to={`/users/${this.props.params.id}`}>Friends</Link>
            <Link to={`/users/${this.props.params.id}`}>Photos</Link>
          </nav>
        </header>

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

module.exports = Profile;
