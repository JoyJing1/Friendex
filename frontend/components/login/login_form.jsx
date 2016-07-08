"use strict";

const ErrorStore = require('../../stores/error_store')
    , Link       = require('react-router').Link
    , Modal      = require('react-modal')
    , React      = require('react');

const SessionActions = require('../../actions/session_actions')
    , SessionStore   = require('../../stores/session_store')
    , SignupForm     = require('./signup_form');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '45%',
    right                 : '45%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const LoginForm = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return {
      email: "",
      password: "",
      modalIsOpen: false
    };
  },

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillMount() {
    Modal.setAppElement('body');
   },

  componentWillUnmount() {
    this.errorListener.remove();
    this.sessionListener.remove();
  },

  redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
  },

	handleSubmit(e) {
		e.preventDefault();

		const formData = {
			email: this.state.email,
			password: this.state.password
		};

    // console.log("handleSubmit(e) in login_form.jsx");
    SessionActions.logIn(formData, this.openModal);
	},

  openModal() {
    this.setState({modalIsOpen: true});
  },

  closeModal() {
    this.setState({modalIsOpen: false});
  },

  update(property) {
    return (e) => this.setState( { [property]: e.target.value } );
  },

  loginGuest() {
    this.setState( { email: "mark@facebook.com", password: "testtest" }  );
  },

  render() {

    return (
      <header className="logged-out-container">
        <nav className="logged-out-header-nav clearfix">

          <h1 className="fd-logo">
            <a href="#">friendex</a>
          </h1>

          <form className="login-form-box clearfix" onSubmit={this.handleSubmit}>

            <label for="email">Email
            <input type="email"
              value={this.state.email}
              label="email"
              id="login-email"
              onChange={this.update("email")}/>
            </label>

            <label for="password">Password
            <input type="password"
              value={this.state.password}
              label="password"
              id="login-password"
              onChange={this.update("password")}/>
            </label>

            <div className="login-buttons">
              <input type="submit" value="Log In"/>
              <button className="demo"
                      onClick={this.loginGuest}>Guest Login
              </button>
            </div>

          </form>

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            style={customStyles} >

            <button onClick={this.closeModal} className="close-modal">☓</button>
            <h2 ref="subtitle" className="modal-text">The email and password combination you entered does not match an account. Sign up for an account!</h2>

            <div className="signup-form-modal">
              <SignupForm/>
            </div>

          </Modal>

        </nav>
      </header>
    );
  }
});

module.exports = LoginForm;
