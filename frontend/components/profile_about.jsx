"use strict";

const React = require('react');
const Link = require('react-router').Link;
const ProfileStore = require('../stores/profile_store');
const ProfileActions = require('../actions/profile_actions');
// const ProfileTimelie = require('./profile_timelie');
const ProfileConstants = require('../constants/profile_constants');
// const ProfileActions = require('../actions/profile_actions');

const ProfileAbout = React.createClass({
  // getInitialState() {
  //   return { profile: ProfileStore.getProfile() };
  // },
  //
  // componentDidMount() {
  //   console.log(this.props.params);
  //   debugger;
  //   ProfileActions.fetchSingleProfile(this.props.params.user_id);
  //   this.profileListener = ProfileStore.addListener(this._updateProfile);
  // },
  //
  // componentWillUnmount() {
  //   this.profileListener.remove();
  // },

  _updateProfile(profile) {
    this.setState({ profile: ProfileStore.getProfile() });
    console.log("_updateProfile(profile) in profile.jsx");
    // console.log(this.props);
  },

  _location() {
    if (this.props.profile.hometown) {
      return (<li>
        <img src="http://res.cloudinary.com/joyjing1/image/upload/v1467221755/icons/iconmonstr-location-1-240.png">
        </img>Was born in {this.props.profile.hometown}
      </li>);
    } else if (this.props.profile.current_city) {
      return (<li>
        <img src="http://res.cloudinary.com/joyjing1/image/upload/v1467221755/icons/iconmonstr-location-1-240.png">
        </img>Lives in {this.props.profile.current_city}
      </li>);
    }
  },
  _workplace() {
    if (this.props.profile.workplace) {
      return (<li>
        <img src="http://res.cloudinary.com/joyjing1/image/upload/v1467222106/icons/iconmonstr-briefcase-1-240.png">
        </img>{this.props.profile.workplace}
      </li>);
    }
  },
  _email() {
    // debugger;
    if (this.props.profile.email) {
      return (<li>
        <img src="http://res.cloudinary.com/joyjing1/image/upload/v1467222543/icons/iconmonstr-email-1-240.png">
        </img>{this.props.profile.email}
      </li>);
    }
  },
  _birthday() {
    // debugger;
    if (this.props.profile.birthday) {
      return (<li>
        <img src="http://res.cloudinary.com/joyjing1/image/upload/v1467223004/icons/Birthday_Cake-52.png">
        </img>{this._parseDate(this.props.profile.birthday)}
      </li>);
    }
  },
  _parseDate(date) {
    const dateParts = date.split("-");
    const monthName = ProfileConstants.MONTHS[dateParts[1]-1];
    return `${monthName} ${parseInt(dateParts[2])}, ${dateParts[0]}`;
  },
  render() {
    return (
      <div className="profile-about">
        <h3>
          <img className="profile-about-icon" src="http://res.cloudinary.com/joyjing1/image/upload/v1467220595/icons/iconmonstr-user-1-240_1.png">
          </img>About
        </h3>

          <ul className="profile-about-info">
            {this._email()}
            {this._birthday()}
            {this._workplace()}
            {this._location()}
          </ul>
      </div>
    );
  },
});


module.exports = ProfileAbout;
