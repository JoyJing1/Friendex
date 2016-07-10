"use strict";

const Link  = require('react-router').Link
    , React = require('react');

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

const ProfileActions   = require('../../actions/profile_actions')
    , ProfileConstants = require('../../constants/profile_constants')
    , ProfileStore     = require('../../stores/profile_store');

const ProfileAbout = React.createClass({

  _email() {
    if (this.props.profile.email) {
      return (<li>
        <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_40,w_40/v1467222543/icons/iconmonstr-email-1-240.png">
        </img>{this.props.profile.email}
      </li>);
    }
  },

  _birthday() {
    if (this.props.profile.birthday) {
      return (<li>
        <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_40,w_40/v1467223004/icons/Birthday_Cake-52.png">
        </img>{this._parseDate(this.props.profile.birthday)}
      </li>);
    }
  },

  _workplace() {
    if (this.props.profile.workplace) {
      return (<li>
        <img src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_40,w_40/v1467222106/icons/iconmonstr-briefcase-1-240.png">
        </img>{this.props.profile.workplace}
      </li>);
    }
  },

  _location() {
    if (this.props.profile.current_city) {
      return (<li>
        <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_40,w_40/v1467997308/icons/iconmonstr-location-1-240_2.png">
        </img>Lives in {this.props.profile.current_city}
      </li>);
    }
  },

  _hometown() {
    if (this.props.profile.hometown) {
      return (<li>
        <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_40,w_40/v1467996545/icons/iconmonstr-location-1-240_1.png">
        </img>Born in {this.props.profile.hometown}
      </li>);
    }
  },

  _relationship() {
    if (this.props.profile.relationship === "single" || this.props.profile.relationship === "divorced") {
      return (<li>
        <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_40,w_40/v1467996855/icons/iconmonstr-favorite-3-240.png">
        </img>{this.props.profile.relationship.capitalize()}
      </li>);
    } else if (this.props.profile.relationship === "in a relationship") {
      return (<li>
        <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_40,w_40/v1467997193/icons/iconmonstr-favorite-3-240_1.png">
        </img>In a Relationship
      </li>);
    } else if (this.props.profile.relationship) {
      return (<li>
        <img src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,h_40,w_40/v1467997193/icons/iconmonstr-favorite-3-240_1.png">
        </img>{this.props.profile.relationship.capitalize()}
      </li>);
    }
  },


  _parseDate(date) {
    const dateParts = date.split("-");
    const monthName = ProfileConstants.MONTHS[dateParts[1]-1];
    return `${monthName} ${parseInt(dateParts[2])}, ${dateParts[0]}`;
  },

  render() {
    return (
      <div className="profile-about">
        <h3>
          <img className="profile-about-icon" src="https://res.cloudinary.com/joyjing1/image/upload/c_scale,h_20,w_20/v1467220595/icons/iconmonstr-user-1-240_1.png">
          </img>About
        </h3>

          <ul className="profile-about-info">
            {this._email()}
            {this._birthday()}
            {this._workplace()}
            {this._relationship()}
            {this._location()}
            {this._hometown()}
          </ul>
      </div>
    );
  },
});

module.exports = ProfileAbout;
