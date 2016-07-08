"use strict";

const Modal = require('react-modal')
    , React = require('react');


const customStyles = {
  overlay : {
   position          : 'fixed',
   top               : 0,
   left              : 0,
   right             : 0,
   bottom            : 0,
   backgroundColor   : "#000000",
   opacity           : 0.9
 },
  content : {
    top                   : '50%',
    left                  : '45%',
    right                 : '45%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
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
    console.log('openModal() in PhotoItem');
    this.setState({modalIsOpen: true});
  },

  closeModal() {
    console.log('closeModal() in PhotoItem');
    this.setState({modalIsOpen: false});
  },

  handleClick() {
    console.log('in handleClick() in PhotoItem');
    // openModal();
  },

  // <button onClick={this.openModal}>
  //       </button>
  //
  // <button onClick={this.deletePhoto}
  //   value={this.props.image.id}
  //   className="delete-photo">☓</button>



  render() {
    console.log('rendered a PhotoItem');

    return (
      <li className="photo-clickable grow"
          key={this.props.image.id}>
        <button onClick={this.openModal}>

          <img src={this.props.image.url}></img>

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            shouldCloseOnOverlayClick={true}
            onBackdropClick={this.closeModal}
            style={customStyles} >

            <button onClick={this.closeModal} className="close-modal-photo">☓</button>

            <img src={this.props.image.url} alt="photo"/>

          </Modal>

        </button>

      </li>
    );
  }
});


module.exports = PhotoItem;
