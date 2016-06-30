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

    console.log("handleSubmit(e) in login_form.jsx");
    SessionActions.logIn(formData);
    // if (this.props.location.pathname === "/login") {
    // } else {
    //   console.log(this.props.location.pathname);
    //   SessionActions.signUp(formData);
    // }
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

              <input type="submit" value="Log In"/>

          </form>
        </nav>
		  </header>
		);
	}
});

module.exports = LoginForm;
