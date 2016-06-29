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
      birthMonth: "",
      birthDay: "",
      birthYear: "",
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

  _setDefaultProfilePic(profileData) {
    if (this.state.gender === "female") {
      profileData["profile_img"] = "http://res.cloudinary.com/joyjing1/image/upload/v1467214764/profiles/profile_default_woman.jpg";
    } else if (this.state.gender === "male") {
      profileData["profile_img"] = "http://res.cloudinary.com/joyjing1/image/upload/v1467214758/profiles/123.jpg";
    } else {
      profileData["profile_img"] = "http://res.cloudinary.com/joyjing1/image/upload/v1467214732/profiles/no-profile-image.jpg";
    }
    return profileData;
  },

	handleSubmit(e) {
		e.preventDefault();

    const userData = {
      email: this.state.email1,
      password: this.state.password,
      username: `${this.state.firstName} ${this.state.lastName}`
    };

    const birthday = this.state.birthYear + "-" + this.state.birthMonth + "-" + this.state.birthDay;
		const profileData = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      birthday: birthday,
      gender: this.state.gender
		};
    const profileDataFull = this._setDefaultProfilePic(profileData);

    console.log(userData);
    console.log(profileData);
    console.log("handleSubmit(e) in signup_form.jsx");
    SessionActions.signUp({user: userData, profile: profileDataFull});
	},

  // Will need to update formatting
  fieldErrors(field) {
    // debugger;
    const errors = ErrorStore.formErrors("signup");

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
		  <div className="signup-form-container clearfix">
        <div className="signup-form-header clearfix">
          <h1>Sign Up</h1>
          <h2>It's free and always will be</h2>
        </div>

        <form className="signup-form-box" onSubmit={this.handleSubmit}>

          <div className="new-user-name clearfix">
            { this.fieldErrors("firstName") }
            <input type="text"
                    value={this.state.firstName}
                    label="firstName"
                    id="new-first-name"
                    placeholder="First name"
                    onChange={this.update("firstName")}/>

            { this.fieldErrors("lastName") }
                  <input type="text"
                    value={this.state.lastName}
                    label="lastName"
                    id="new-last-name"
                    placeholder="Last name"
                    onChange={this.update("lastName")}/>
          </div>

          { this.fieldErrors("email1") }
          <input type="text"
                  value={this.state.email1}
                  label="email1"
                  placeholder="Email"
                  onChange={this.update("email1")}/>

          { this.fieldErrors("email2") }
          <input type="text"
                  value={this.state.email2}
                  label="email2"
                  placeholder="Re-enter email"
                  onChange={this.update("email2")}/>

          { this.fieldErrors("password") }
          <input type="password"
                  value={this.state.password}
                  label="password"
                  placeholder="New password"
                  onChange={this.update("password")}/>

          <div className="signup-birthday">
            { this.fieldErrors("birthMonth") }
            <select className="birthday-month" defaultValue={0}
              onChange={this.update("birthMonth")}>
              <option value={0} disabled>Month</option>
              { months.map( (month, i) => {
                return <option value={i+1} key={i+1}>{month}</option>;
              } )}
            </select>

            { this.fieldErrors("birthDay") }
            <select className="birthday-day" defaultValue={0}
              onChange={this.update("birthDay")}>
              <option value={0} disabled>Day</option>
              { days.map(i => {
                return <option value={i} key={i}>{i}</option>;
              }) }
            </select>

            { this.fieldErrors("birthYear") }
            <select className="birthday-year" defaultValue={0}
              onChange={this.update("birthYear")}>
              <option value={0} disabled>Year</option>
              { years.map(i => {
                return <option value={i} key={i}>{i}</option>;
              }) }
            </select>
          </div>

          <div className="signup-gender">
            { this.fieldErrors("gender") }
            <label for="f">
            <input type="radio"
                    name="gender"
                    value="female"
                    key="f"
                    onChange={this.update("gender")}/> Female
            </label>
            <label for="m">
            <input type="radio"
                    name="gender"
                    value="male"
                    key="m"
                    className="gender-male"
                    onChange={this.update("gender")}/> Male
            </label>
            <label for="o">
            <input type="radio"
                    name="gender"
                    value="other"
                    key="o"
                    onChange={this.update("gender")}/> Other
            </label>
          </div>

          <p>By clicking Sign Up, you agree to our Terms and that you have read our Data Policy, including our Cookie Use.</p>

          <input type="submit" value="Sign Up" id="signup-button"/>

        </form>
		  </div>
		);
	}
});

module.exports = SignupForm;
