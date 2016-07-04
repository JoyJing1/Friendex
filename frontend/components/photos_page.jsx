"use strict";

const React = require('react');
const PropTypes = React.PropTypes;
const SessionStore = require('../stores/session_store');
const ProfileStore = require('../stores/profile_store');
const ImageStore = require('../stores/image_store');
const ImageActions = require('../actions/image_actions');
// const ProfilePhotos = require('./profile_photos');
// const ProfileHeader = require('./profile_header');
const UploadPhotosButton = require('./upload_photos_button');

const PhotosPage = React.createClass({
  getInitialState() {
    return { images: [] };
  },

  componentDidMount() {
    // $.get("/api/images", function(images) {
    //   this.setState({images: images});
    // }.bind(this));

    const currentProfileId = ProfileStore.currentProfile().user_id;
    ImageActions.fetchManyImages(currentProfileId);
    this.imageListener = ImageStore.addListener(this._onChange);
  },

  _onChange() {
    this.setState( { images: ImageStore.all() } );
  },

  addImage(url) {
    const currentProfileId = ProfileStore.currentProfile().user_id;
    let img = { url: url, user_id: currentProfileId };

    ImageActions.createImage(img, (resp) => {
      let images = this.state.images;
      images.unshift(resp);
      this.setState({ images: images });
    });
    // $.ajax({
    //   url: "/api/images",
    //   method: "POST",
    //   data: { image: img, id: currentProfileId },
    //   success: function(image) {
    //     let images = this.state.images;
    //     images.push(image);
    //     this.setState({ images: images });
    //   }.bind(this)
    // });
  },

  render () {
    return (
      <div className="profile-photos-full">

        <h2>This is the Profile Photos Page</h2>
        <UploadPhotosButton postImage={this.addImage}/>


        {this.props.children}
      </div>
    );
  }
});

module.exports = PhotosPage;
