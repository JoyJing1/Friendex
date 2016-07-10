"use strict";

const Modal = require('react-modal')
    , React = require('react');

const ImageActions = require('../../actions/image_actions');

const customStyles = {
  overlay : {
   position          : 'fixed',
   top               : 0,
   left              : 0,
   right             : 0,
   bottom            : 0,
   backgroundColor   : "rgba(0, 0, 0, 0.9)"
 },
  content : {
    top                   : '50%',
    left                  : '45%',
    right                 : '45%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : "000000",
    border                : "none"
  }
};

const PhotoItem = React.createClass({
  getInitialState() {
    return { modalIsOpen: false };
  },

  componentWillMount() {
    Modal.setAppElement('body');
   },

  openModal() {
    // console.log('openModal() in PhotoItem');
    this.setState({modalIsOpen: true});
  },

  closeModal() {
    // console.log('closeModal() in PhotoItem');
    this.setState({modalIsOpen: false});
  },

  deletePhoto(e) {
    e.preventDefault();
    const photoId = parseInt(e.target.value);
    ImageActions.deleteImage(photoId);
  },

  deleteButton() {
    if (this.props.ownProfile) {
      return(
        <button onClick={this.deletePhoto}
          value={this.props.image.id}
          className="delete-photo">Remove Photo</button>
      );
    }
  },

  render() {
    return (
      <li className="photo-clickable grow"
          key={this.props.image.id}>
        <button onClick={this.openModal}>

          <img src={this.props.image.url.replace("upload", "upload/c_limit,h_250")}></img>

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            shouldCloseOnOverlayClick={true}
            onBackdropClick={this.closeModal}
            onRequestClose={this.closeModal}
            style={customStyles} >

            {this.deleteButton()}

            <img src={this.props.image.url} alt="photo" className="modal-photo"/>

          </Modal>

        </button>
      </li>
    );
  }
});

module.exports = PhotoItem;
