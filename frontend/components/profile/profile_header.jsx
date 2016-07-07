"use strict";

const hashHistory = require('react-router').hashHistory
    , Link        = require('react-router').Link
    , React       = require('react');

const FriendshipActions = require('../../actions/friendship_actions')
    , FriendshipStore   = require('../../stores/friendship_store')
    , ProfileAbout      = require('./profile_about')
    , ProfileActions    = require('../../actions/profile_actions')
    , ProfileFriendButton = require('./profile_friend_button')
    , ProfileStore      = require('../../stores/profile_store')
    , SessionStore      = require('../../stores/session_store');

const ProfileHeader = React.createClass({
  getInitialState() {
    return { profile: ProfileStore.currentProfile(),
              currentUser: SessionStore.currentUser(),
              friends: FriendshipStore.friends(),
              friendRequestsReceived: FriendshipStore.friendRequestsReceived(),
              friendRequestsSent: FriendshipStore.friendRequestsSent() };
  },

  componentWillReceiveProps(newProps) {
    ProfileActions.fetchSingleProfile(newProps.params.id);
    FriendshipActions.fetchAllFriends(newProps.params.id);
  },

  componentDidMount() {
    console.log("componentDidMount() in profile_header.jsx");
    const id = parseInt(this.props.params.id);
    ProfileActions.fetchSingleProfile(id);
    this.profileListener = ProfileStore.addListener(this._onChange);

    FriendshipActions.fetchAllFriends(id);
    this.friendshipListener = FriendshipStore.addListener(this._onChange);

    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    this.profileListener.remove();
    this.friendshipListener.remove();
    this.sessionListener.remove();
  },

  _onChange() {
    this.setState({ profile: ProfileStore.currentProfile(),
                    currentUser: SessionStore.currentUser(),
                    friends: FriendshipStore.friends(),
                    friendRequestsReceived: FriendshipStore.friendRequestsReceived(),
                    friendRequestsSent: FriendshipStore.friendRequestsSent() });

    console.log("_onChange() in profile_header.jsx");
  },

  _toTimeline(id) {
    hashHistory.replace(`users/${this.state.profile.user_id}/timeline`);
  },

  render() {
    return(
      <header className="profile-nav clearfix">
        <div className="background-container clearfix">
          <img src={this.state.profile.background_img} className="background-img"/>
        </div>

        <div className="profile-header-nav">
          <div className="redirect" onClick={this._toTimeline}>
            <img src={this.state.profile.profile_img}
              className="profile-img"/>
          </div>

          <h1>{this.state.profile.username}</h1>

          <div className='friend-request-response-buttons clearfix'>
            <ProfileFriendButton friends={this.state.friends}
              friendRequestsReceived={this.state.friendRequestsReceived}
              friendRequestsSent={this.state.friendRequestsSent}
              profile={this.state.profile}
              currentUser={this.state.currentUser}/>
          </div>

          <nav className="profile-tabs">
            <Link to={`/users/${this.state.profile.user_id}/timeline`}>Timeline</Link>
            <Link to={`/users/${this.state.profile.user_id}/about`}>About</Link>
            <Link to={`/users/${this.state.profile.user_id}/friends`}>Friends</Link>
            <Link to={`/users/${this.state.profile.user_id}/photos`}>Photos</Link>
          </nav>
        </div>

        {this.props.children}
      </header>
    );
  }

});

module.exports = ProfileHeader;
