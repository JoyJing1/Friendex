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
    hashHistory.push(`users/${this.state.profile.user_id}/timeline`);
  },


  uploadBackgroundImg(e) {
    e.preventDefault(e);

    if (this.state.currentUser.id === this.state.profile.user_id) {
      let that = this;

      cloudinary.openUploadWidget(
        window.CLOUDINARY_OPTIONS,
        function(error, images) {
          if (error === null) {
            console.log("Upload succeeded in upload_photos_button.jsx");
            for (let i = 0; i < images.length; i++) {
              let currentProfile = ProfileStore.currentProfile();
              currentProfile['background_img'] = images[i].url;
              ProfileActions.updateProfile(currentProfile);
            }
          } else {
            console.log("Upload failed in uploa_photos_button.jsx");
          }
        }
      );
    }

  },


  uploadProfileImg(e) {
    e.preventDefault(e);

    if (this.state.currentUser.id === this.state.profile.user_id) {
      let that = this;

      cloudinary.openUploadWidget(
        window.CLOUDINARY_OPTIONS,
        function(error, images) {
          if (error === null) {
            console.log("Upload succeeded in upload_photos_button.jsx");
            for (let i = 0; i < images.length; i++) {
              let currentProfile = ProfileStore.currentProfile();
              currentProfile['profile_img'] = images[i].url;
              ProfileActions.updateProfile(currentProfile);
            }
          } else {
            console.log("Upload failed in uploa_photos_button.jsx");
          }
        }
      );

    } else {
      hashHistory.push(`users/${this.state.profile.user_id}/about`);
    }

  },

  backgroundImg() {
    if (this.state.currentUser.id === this.state.profile.user_id) {
      return (
        <a className="redirect" onClick={this.uploadBackgroundImg}>
          <div className="background-container clearfix">
            <img src={this.state.profile.background_img} className="background-img" alt="background-img"/>
          </div>
        </a>
      );
    } else {
      return (
        <div className="background-container clearfix">
          <img src={this.state.profile.background_img} className="background-img" alt="background-img"/>
        </div>
      );
    }
  },
  //
  // <div className="background-container clearfix">
  //   <img src={this.state.profile.background_img} className="background-img" alt="background-img"/>
  // </div>


  render() {
    return(
      <header className="profile-nav clearfix">

        {this.backgroundImg()}

        <div className="profile-header-nav">
          <div className="redirect profile-img-container" onClick={this.uploadProfileImg}>
            <img src={this.state.profile.profile_img} alt="profile-img"/>
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
