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
    cloudinary.openUploadWidget(
      window.CLOUDINARY_OPTIONS,
      function(error, images) {
        if (error === nul) {
          // Upload successful
          console.log("Upload successful in uploa_photos_button.jsx");
          for (i = 0; i < images.length; i++) {
            this.props.postImage(images[i].url);
          }
        } else {
          console.log("Upload failed in uploa_photos_button.jsx");
          // Upload faile
        }
      }
    );

  },

  render () {
    return (
      <button onClick={this.upload}>Add Photos</button>
    );
  }
});

module.exports = UploadPhotosButton;
