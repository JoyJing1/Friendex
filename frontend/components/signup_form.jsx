"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');

const SignupForm = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return {
      firstName: "",
      lastName: "",
      email1: "",
      email2: "",
      password: "",
      birthday: "",
      gender: ""
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

  update(property) {
    return (e) => this.setState( { [property]: e.target.value } );
  },

	render() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let days = [];
    for(let i=1; i <= 31; i++) {
      days.push(i);
    }

    let years = [];
    const currYear = new Date().getFullYear();
    for(let i=1905; i<=currYear; i++) {
      years.push(i);
    }
    years.reverse();


		return (
		  <div className="signup-form-container">
        <div className="signup-form-header">
          <h1>Sign Up</h1>
          <h2>It's free and always will be</h2>
        </div>

        <form className="login-form-box">

          <input type="string"
                  value={this.state.firstName}
                  label="firstName"
                  placeholder="First name"
                  onChange={this.update("firstName")}/>

          <input type="string"
                  value={this.state.lastName}
                  label="lastName"
                  placeholder="Last name"
                  onChange={this.update("lastName")}/>
                  <br/>

          <input type="string"
                  value={this.state.email1}
                  label="email1"
                  placeholder="Email"
                  onChange={this.update("email1")}/>
                  <br/>

          <input type="string"
                  value={this.state.email2}
                  label="email2"
                  placeholder="Re-enter email"
                  onChange={this.update("email2")}/>
                  <br/>

          <input type="password"
                  value={this.state.password}
                  label="password"
                  placeholder="New password"
                  onChange={this.update("password")}/>
                  <br/>

          <select className="birthday-month" defaultValue={0}>
            <option value={0} disabled>Month</option>
            { months.map( (month, i) => {
              return <option value={i+1} key={i+1}>{month}</option>;
            } )}
          </select>

          <select className="birthday-day" defaultValue={0}>
            <option value={0} disabled>Day</option>
            { days.map(i => {
              return <option value={i} key={i}>{i}</option>;
            }) }
          </select>

          <select className="birthday-year" defaultValue={0}>
            <option value={0} disabled>Year</option>
            { years.map(i => {
              return <option value={i} key={i}>{i}</option>;
            }) }
          </select>

          <div>
            <input type="radio"
                    name="gender"
                    value="female"
                    key="f"/> Female
            <input type="radio"
                    name="gender"
                    value="male"
                    key="m"/> Male
            <input type="radio"
                    name="gender"
                    value="other"
                    key="o"/> Other
          </div>
          <br/>

          <p>By clicking Sign Up, you agree to our Terms and that you have read our Data Policy, including our Cookie Use.</p>

          <input type="submit" value="Sign Up"/>

        </form>
		  </div>
		);
	}
});

module.exports = SignupForm;
