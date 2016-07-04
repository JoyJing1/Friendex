"use strict";

const React = require('react');
const PropTypes = React.PropTypes;
const ProfileStore = require('../stores/profile_store');
const ProfileActions = require('../actions/profile_actions');
// const ProfilePhotos = require('./profile_photos');
const ProfileHeader = require('./profile_header');
const UploadPhotosButton = require('./upload_photos_button');

const PhotosPage = React.createClass({
  getInitialState() {
    return { images: [] };
  },

  componentDidMount() {
    $.get("/api/images", function(images) {
      this.setState({images: images});
    }.bind(this));
  },

  postImage(url) {
    let img = { url: url };

    $.ajax({
      url: "/apis/images",
      method: "POST",
      data: { image: img },
      success: function(image) {
        let images = this.state.images;
        images.push(image);
        this.setState({ images: images });
      }.bind(this)
    });
  },

  render () {
    return (
      <div className="profile-photos-full">

        <h2>This is the Profile Photos Page</h2>
        <UploadPhotosButton postImage={this.postImage}/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = PhotosPage;
