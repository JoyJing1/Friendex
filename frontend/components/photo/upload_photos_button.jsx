"use strict";

const PropTypes = require('react').PropTypes
    , React = require('react');

const UploadPhotosButton = React.createClass({
  upload(e) {
    e.preventDefault(e);
    let that = this;

    cloudinary.openUploadWidget(
      window.CLOUDINARY_OPTIONS,
      function(error, images) {
        if (error === null) {
          // console.log("Upload succeeded in upload_photos_button.jsx");
          for (let i = 0; i < images.length; i++) {
            that.props.postImage(images[i].url);
          }
        } else {
          // console.log("Upload failed in uploa_photos_button.jsx");
          // console.log(error);
        }
      }
    );

  },

  _checkOwnProfile() {
    if (this.props.ownProfile) {
      return (
        <button onClick={this.upload}
                className="add-photo-button">Add Photos</button>
      );
    }
  },

  render() {
    return (
      <div>
        {this._checkOwnProfile()}
      </div>
    );
  }

});

module.exports = UploadPhotosButton;
