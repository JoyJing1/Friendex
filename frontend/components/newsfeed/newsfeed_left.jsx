"use strict";

const Link    = require('react-router').Link
      , React = require('react');

const ProfileActions = require('../../actions/profile_actions')
    , ProfileStore   = require('../../stores/profile_store')
    , SessionActions = require('../../actions/session_actions')
    , SessionStore   = require('../../stores/session_store');

const NewsfeedLeft = React.createClass({
  getInitialState() {
    return { profile: SessionStore.currentUserProfile() };
  },

  componentDidMount() {
    // ProfileActions.fetchCurrentUserProfile();
    this.sessionListener = SessionStore.addListener(this._update);
  },

  componentWillUnmount() {
    this.sessionListener.remove();
  },

  componentWillReceiveProps(newProps) {
    // SessionActions.fetchCurrentUser();
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
              <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_30,w_30/v1467597686/icons/iconmonstr-pencil-14-240_2.png"
                    className="left-icon"></img>
                  <h5>Profile Page</h5>
            </Link>
          </li>

          <li>
            <Link to={`/users/${this.state.profile.user_id}/timeline`}>
              <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_30,w_30/v1467597860/icons/iconmonstr-user-1-240_2.png"
                    className="left-icon"></img>
                  <h5>Timeline</h5>
            </Link>
          </li>

          <li>
            <Link to={`/users/${this.state.profile.user_id}/photos`}>
              <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_30,w_30/v1467675714/icons/iconmonstr-picture-12-240.png"
                    className="left-icon"></img>
                  <h5>Photos</h5>
            </Link>
          </li>

          <li>
            <Link to={`/users/${this.state.profile.user_id}/friends`}>
              <img src="http://res.cloudinary.com/joyjing1/image/upload/v1467691394/icons/iconmonstr-user-29-240_1.png"
                    className="left-icon left-friends-icon"></img>
                  <h5>Friends</h5>
            </Link>
          </li>

        </ul>

      </aside>
    );
  }
});

module.exports = NewsfeedLeft;
