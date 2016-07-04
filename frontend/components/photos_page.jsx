"use strict";

const React = require('react');
const PropTypes = React.PropTypes;
const SessionStore = require('../stores/session_store');
const ProfileStore = require('../stores/profile_store');
const ImageStore = require('../stores/image_store');
const ImageActions = require('../actions/image_actions');
const UploadPhotosButton = require('./upload_photos_button');

const PhotosPage = React.createClass({
  getInitialState() {
    return { images: [] };
  },

  componentDidMount() {
    console.log("componentDidMount() in photos_page.js");
    ImageActions.fetchManyImages(this.props.params.id);
    this.imageListener = ImageStore.addListener(this._onChange);
  },

  _onChange() {
    console.log("_onChange() in photos_page.js");
    this.setState( { images: ImageStore.all() } );
    console.log(this.state);
  },

  addImage(url) {
    let img = { url: url, user_id: this.props.params.id };

    ImageActions.createImage(img, (resp) => {
      let images = this.state.images;
      images.unshift(resp);
      this.setState({ images: images });
    });
  },

  render () {
    return (
      <div className="profile-photos-full">

        <h3>
          <img src="http://res.cloudinary.com/joyjing1/image/upload/v1467669448/icons/iconmonstr-picture-5-240.png"
            className="photos-icon">
          </img>Photos

          <UploadPhotosButton postImage={this.addImage} className="upload-photo"/>
        </h3>

          <ul className="photo-list clearfix">
            {
              this.state.images.map( image => {
                return (
                  <li className="photo-clickable">
                    <img src={image.url}></img>
                  </li>
                );
              })
            }
          </ul>


      </div>
    );
  }

});

module.exports = PhotosPage;



// {this.props.children}

// {
//   this.state.images.map( image => {
//     return (
//       <li className="photo-clickable">
//         // <img src={image.url} alt="Photo Item">
//         {image.url}
//       </li>
//     );
//   })
// }
