"use strict";

const React = require('react');

const ImageActions       = require('../../actions/image_actions')
    , ImageStore         = require('../../stores/image_store')
    , PhotoItem          = require('./photo_item')
    , ProfileStore       = require('../../stores/profile_store')
    , PropTypes          = React.PropTypes
    , SessionStore       = require('../../stores/session_store')
    , UploadPhotosButton = require('./upload_photos_button');

const PhotosPage = React.createClass({
  getInitialState() {
    return { images: [],
              ownProfile: SessionStore.currentUser().id === parseInt(this.props.params.id) };
  },

  componentDidMount() {
    console.log("componentDidMount() in photos_page.js");
    ImageActions.fetchManyImages(this.props.params.id);
    this.imageListener = ImageStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    this.imageListener.remove();
  },

  componentWillReceiveProps(newProps) {
    ImageActions.fetchManyImages(newProps.params.id);
  },

  _onChange() {
    console.log("_onChange() in photos_page.js");
    this.setState( { images: ImageStore.all(),
                      ownProfile: SessionStore.currentUser().id === parseInt(this.props.params.id) } );
    console.log(this.state);
  },

  addImage(url) {
    let img = { url: url,
                receiver_id: this.props.params.id,
                author_id: this.props.params.id };

    ImageActions.createImage(img);
  },

  deletePhoto(e) {
    e.preventDefault();
    const photoId = parseInt(e.target.value);
    ImageActions.deleteImage(photoId);
  },

  _checkImages() {
    if (this.state.images.length === 0) {
      return (
        <ul className="no-photos">
          No photos to display
        </ul>
      );
    } else if (this.state.ownProfile) {
      return (
        <ul className="photo-list clearfix">
          {
            this.state.images.map( image => {
              return (
                <li className="photo-clickable grow"
                    key={image.id}>
                  <img src={image.url}></img>
                    <button onClick={this.deletePhoto}
                      value={image.id}
                      className="delete-photo">☓</button>
                </li>
              );
            })
          }
        </ul>
      );
    } else {
      return (
        <ul className="photo-list clearfix">
          {
            this.state.images.map( image => {
              return <PhotoItem image={image} key={image.id}/> ;
            })
          }
        </ul>
      );
    }
  },


  // <li className="photo-clickable grow"
  //     key={image.id}>
  //   <img src={image.url}></img>
  // </li>

  render () {
    return (
      <div className="profile-photos-full">

        <h3>
          <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,w_40/v1467669448/icons/iconmonstr-picture-5-240.png"
            className="photos-icon">
          </img>Photos

          <UploadPhotosButton postImage={this.addImage}
                              className="upload-photo"
                              ownProfile={this.state.ownProfile}/>
        </h3>

        {this._checkImages()}

      </div>
    );
  }

});

module.exports = PhotosPage;
