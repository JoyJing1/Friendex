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
      this.context.router.push("/"); // Just send to newsfeed instead
    }
  },

	handleSubmit(e) {
		e.preventDefault();

		const formData = {
			email: this.state.email,
			password: this.state.password
		};

    if (this.props.location.pathname === "/login") {
      SessionActions.logIn(formData);
    } else {
      SessionActions.signUp(formData);
    }
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

  // formType() {
  //   return this.props.location.pathname.slice(1);
  // },

  update(property) {
    return (e) => this.setState( { [property]: e.target.value } );
  },

	render() {

		return (
		  <div className="login-form-container">
        <h1 className="fd-logo">friendex</h1>

        <form className="login-form-box">

          <label for="email">Email</label>
          <input type="string"
                  value={this.state.email}
                  label="email"
                  onChange={this.update("email")}/>

          <label for="password">Password</label>
          <input type="password"
                  value={this.state.password}
                  label="password"
                  onChange={this.update("password")}/>

          <input type="submit" value="Log In"/>

        </form>
		  </div>
		);
	}
});

module.exports = LoginForm;
