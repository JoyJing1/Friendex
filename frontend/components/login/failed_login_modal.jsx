// var React = require('react');
// var ReactDOM = require('react-dom');
// var Modal = require('react-modal');
//
// var appElement = document.getElementById('your-app-element');
//
// /*
// By default the modal is anchored to document.body. All of the following overrides are available.
//
// * element
// Modal.setAppElement(appElement);
//
// * query selector - uses the first element found if you pass in a class.
// Modal.setAppElement('#your-app-element');
//
// */
//
// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };
//
//
// var App = React.createClass({
//
//   getInitialState: function() {
//     return { modalIsOpen: false };
//   },
//
//   openModal: function() {
//     this.setState({modalIsOpen: true});
//   },
//
//   afterOpenModal: function() {
//     // references are now sync'd and can be accessed.
//     this.refs.subtitle.style.color = '#f00';
//   },
//
//   closeModal: function() {
//     this.setState({modalIsOpen: false});
//   },
//
//   render: function() {
//     return (
//       <div>
//         <button onClick={this.openModal}>Open Modal</button>
//         <Modal
//           isOpen={this.state.modalIsOpen}
//           onAfterOpen={this.afterOpenModal}
//           onRequestClose={this.closeModal}
//           style={customStyles} >
//
//           <h2 ref="subtitle">Hello</h2>
//           <button onClick={this.closeModal}>close</button>
//           <div>I am a modal</div>
//           <form>
//             <input />
//             <button>tab navigation</button>
//             <button>stays</button>
//             <button>inside</button>
//             <button>the modal</button>
//           </form>
//         </Modal>
//       </div>
//     );
//   }
// });
