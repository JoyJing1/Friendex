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
    this.profileListener = ProfileStore.addListener(this._updateProfile);

    FriendshipActions.fetchAllFriends(id);
    this.friendshipListener = FriendshipStore.addListener(this._updateProfile);

    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    this.profileListener.remove();
    this.friendshipListener.remove();
    this.sessionListener.remove();
  },

  // updateProfileImg(e) {
  //   e.preventDefault();
  //   const currentUser = SessionStore.currentUser();
  //   const currentProfile = ProfileStore.currentProfile();
  //
  //   if (currentUser.id === currentProfile.id) {
  //     let that = this;
  //
  //     cloudinary.openUploadWidget(
  //       window.CLOUDINARY_OPTIONS,
  //       function(error, images) {
  //         if (error === null) {
  //           console.log("Upload succeeded in profile_header.jsx");
  //           const profile = { profile_img: images[0].url,
  //                           id: currentProfile.id};
  //           ProfileActions.updateProfile(profile);
  //
  //         } else {
  //           console.log("Upload failed in profile_header.jsx");
  //           console.log(error);
  //         }
  //       }
  //     );
  //   } else {
  //     hashHistory.push(`users/${currentProfile.id}/about`);
  //   }
  //
  // },

  _updateProfile() {
    // const profile = ProfileStore.currentProfile();
    // const friends = FriendshipStore.friends();
    // const friendRequestsReceived = FriendshipStore.friendRequestsReceived();
    // const friendRequestsSent = FriendshipStore.friendRequestsSent();
    //
    // this.setState({ profile: profile,
    //                 currentUser: SessionStore.currentUser(),
    //                 friends: friends,
    //                 friendRequestsReceived: friendRequestsReceived,
    //                 friendRequestsSent: friendRequestsSent });

    this.setState({ profile: ProfileStore.currentProfile(),
                    currentUser: SessionStore.currentUser(),
                    friends: FriendshipStore.friends(),
                    friendRequestsReceived: FriendshipStore.friendRequestsReceived(),
                    friendRequestsSent: FriendshipStore.friendRequestsSent() });

    console.log("_updateProfile() in profile_header.jsx");
  },
  //
  // _sendFriendRequest(e) {
  //   e.preventDefault(e);
  //
  //   const friendship = { requestor_id: SessionStore.currentUser().id,
  //                         receiver_id: ProfileStore.currentProfile().user_id,
  //                         status: "pending"};
  //   FriendshipActions.createFriendship(friendship);
  // },
  //
  // _acceptFriendship(e) {
  //   e.preventDefault(e);
  //
  //   const friendship = { requestor_id: ProfileStore.currentProfile().user_id,
  //                         receiver_id: SessionStore.currentUser().id,
  //                         status: "accepted" };
  //   FriendshipActions.updateFriendship(friendship, "requestor");
  // },
  //
  // _rejectFriendship(e) {
  //   e.preventDefault(e);
  //
  //   const friendship = { requestor_id: ProfileStore.currentProfile().user_id,
  //                         receiver_id: SessionStore.currentUser().id,
  //                         status: "denied" };
  //   FriendshipActions.updateFriendship(friendship, "requestor");
  // },
  //
  // _cancelFriendRequest(e) {
  //   e.preventDefault(e);
  //
  //   const friendship = { requestor_id: SessionStore.currentUser().id,
  //                         receiver_id: ProfileStore.currentProfile().user_id};
  //   FriendshipActions.removeFriendship(friendship);
  // },
  //
  // _checkConnection(id, arrayFriends) {
  //     let included = false;
  //     arrayFriends.forEach(friend => {
  //       if (friend.friend_id === id) {
  //         included = true;
  //       }
  //     });
  //     return included;
  // },

  // _toCurrUserFriends(id) {
  //   const currUserId = SessionStore.currentUser().id;
  //   hashHistory.replace(`users/${currUserId}/friends`);
  // },

  _toTimeline(id) {
    // const currProfileId = ProfileStore.currentProfile().id;
    hashHistory.replace(`users/${this.state.profile.user_id}/timeline`);
  },
  //
  // _currentlyFriendsButton() {
  //   return(
  //     <button className="add-friend currently-friends" onClick={this._toCurrUserFriends}>
  //       <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_10,w_10/v1467497415/iconmonstr-check-mark-1-240_uufxhe.png">
  //       </img>
  //       Friends
  //     </button>
  //   );
  // },
  //
  // _addFriendButton() {
  //   return(
  //     <button className="add-friend" onClick={this._sendFriendRequest}>
  //       <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_10,w_10/v1467342419/icons/iconmonstr-user-8-240.png">
  //       </img>
  //       Add Friend
  //     </button>
  //   );
  // },
  //
  // _cancelFriendRequestButton() {
  //   return(
  //     <button className="add-friend cancel-request" onClick={this._cancelFriendRequest}>
  //       <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_10,w_10/v1467495849/iconmonstr-user-11-240_1_ehz8lh.png">
  //       </img>
  //       Cancel Request
  //     </button>
  //   );
  // },
  //
  // _acceptFriendRequest() {
  //   return(
  //     <button className="add-friend accept-request" onClick={this._acceptFriendship}>
  //       <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_10,w_10/v1467342419/icons/iconmonstr-user-8-240.png">
  //       </img>
  //       Confirm Friendship
  //     </button>
  //   );
  // },
  //
  // _rejectFriendRequest() {
  //   return(
  //     <button className="add-friend cancel-request" onClick={this._rejectFriendship}>
  //       <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_10,w_10/v1467495849/iconmonstr-user-11-240_1_ehz8lh.png">
  //       </img>
  //       Delete Request
  //     </button>
  //   );
  // },
  //
  // friendshipButton() {
  //   const currentUserId = SessionStore.currentUser().id;
  //   console.log("friendshipButton() in profile_header.jsx");
  //
  //   if (currentUserId === ProfileStore.currentProfile().id) {
  //     console.log("Visiting own page, do NOT show friend button");
  //
  //   } else if (this._checkConnection(currentUserId, this.state.friends)) {
  //     console.log('Currently friends, do not show button');
  //     return this._currentlyFriendsButton();
  //
  //   } else if (this._checkConnection(currentUserId, this.state.friendRequestsReceived)) {
  //     console.log("Current user has sent a friend request, button should say CANCEL REQUEST");
  //     return this._cancelFriendRequestButton();
  //
  //   } else if (this._checkConnection(currentUserId, this.state.friendRequestsSent)) {
  //     console.log("Current user has a request from profile, should show ACCEPT FRIEND REQUEST and DENY FRIEND REQUEST buttons");
  //     return (
  //       <div className='friend-request-accept-reject'>
  //         {this._acceptFriendRequest()}
  //         {this._rejectFriendRequest()}
  //       </div>
  //     );
  //
  //   } else {
  //     console.log("Pair not connected, show ADD FRIEND button");
  //     return this._addFriendButton();
  //   }
  //
  //
  // },

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
