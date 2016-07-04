"use strict";

const React = require('react');
const Link = require('react-router').Link;
const ProfileStore = require('../stores/profile_store');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const ProfileActions = require('../actions/profile_actions');

const NewsfeedLeft = React.createClass({
  getInitialState() {
    return { profile: SessionStore.currentUserProfile() };
  },

  componentDidMount() {
    ProfileActions.fetchCurrentUserProfile();
    this.sessionListener = SessionStore.addListener(this._update);
  },

  componentWillUnmount() {
    this.sessionListener.remove();
  },

  componentWillReceiveProps(newProps) {
    SessionActions.fetchcurrentUser();
  },

  _update() {
    this.setState({ profile: SessionStore.currentUserProfile() });
    console.log("_update() in newsfeed_left.jsx");
    console.log(this.state);
  },

  render() {
    const currentUser = SessionStore.currentUser();
    const currentUserProfile = SessionStore.currentUserProfile();

    return(
      <aside className="newsfeed-left">
        <ul>

          <li>
            <Link to={`/users/${this.state.profile.user_id}`}>
              <img src={this.state.profile.profile_img}
                    className="left-icon"></img>
                  <h5>{this.state.profile.first_name} {this.state.profile.last_name}</h5>
            </Link>
          </li>

          <li>
            <Link to={`/users/${this.state.profile.user_id}/about`}>
              <img src="http://res.cloudinary.com/joyjing1/image/upload/v1467597686/icons/iconmonstr-pencil-14-240_2.png"
                    className="left-icon"></img>
                  <h5>Profile Page</h5>
            </Link>
          </li>

          <li>
            <Link to={`/users/${this.state.profile.user_id}/timeline`}>
              <img src="http://res.cloudinary.com/joyjing1/image/upload/v1467597860/icons/iconmonstr-user-1-240_2.png"
                    className="left-icon"></img>
                  <h5>Timeline</h5>
            </Link>
          </li>

        </ul>

      </aside>
    );
  }
});

module.exports = NewsfeedLeft;
