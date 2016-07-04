"use strict";

const React = require('react');
const PropTypes = React.PropTypes;
// const ProfileStore = require('../stores/profile_store');
// const ProfileActions = require('../actions/profile_actions');
// const ProfilePhotos = require('./profile_photos');
// const ProfileHeader = require('./profile_header');

const UploadPhotosButton = React.createClass({
  upload(e) {
    e.preventDefault(e);
    let that = this;

    cloudinary.openUploadWidget(
      window.CLOUDINARY_OPTIONS,
      function(error, images) {
        if (error === null) {
          console.log("Upload succeeded in upload_photos_button.jsx");
          for (let i = 0; i < images.length; i++) {
            that.props.postImage(images[i].url);
          }
        } else {
          console.log("Upload failed in uploa_photos_button.jsx");
          console.log(error);
        }
      }
  );

  },

  render () {
    return (
      <button onClick={this.upload}
              className="add-photo-button">Add Photos</button>
    );
  }
});

module.exports = UploadPhotosButton;
