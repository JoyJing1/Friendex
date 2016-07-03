"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');

const LoginForm = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return {
      email: "",
      password: ""
    };
  },

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
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

    console.log("handleSubmit(e) in login_form.jsx");
    SessionActions.logIn(formData);
	},

  // Will need to update formatting
  fieldErrors(field) {
    const errors = ErrorStore.formErrors(this.formType());

    if (!errors[field]) { return; }

    const messages = errors[field].map( (errorMsg, i) => {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  update(property) {
    return (e) => this.setState( { [property]: e.target.value } );
  },

  loginGuest() {
    this.setState( { email: "mark@facebook.com", password: "testtest" }  );
    // SessionActions.logIn( { email: "mark@facebook.com", password: "testtest" } );
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
              <input type="text"
                value={this.state.email}
                label="email"
                onChange={this.update("email")}/>
              </label>

              <label for="password">Password
              <input type="password"
                value={this.state.password}
                label="password"
                onChange={this.update("password")}/>
              </label>

              <div className="login-buttons">
                <input type="submit" value="Log In"/>
                <button className="demo"
                        onClick={this.loginGuest}>Guest Login
                </button>
              </div>

          </form>

        </nav>
		  </header>
		);
	}
});

module.exports = LoginForm;
