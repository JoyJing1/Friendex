"use strict";

const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const Newsfeed = React.createClass({
  render() {
    return(
      <aside className="newsfeed-right">

        <div className="newsfeed-right-item">
          <a href="https://github.com/JoyJing1">
            Check out the Developer
            <img className="git-logo" src="http://res.cloudinary.com/joyjing1/image/upload/v1467598347/icons/iconmonstr-github-1-240.png"></img>
            joyjing1
          </a>
        </div>

        <div className="newsfeed-right-item">
          <a href="https://www.linkedin.com/in/joyjing1">
            Connect with Joy Jing
            <img className="linkedin-logo" src="http://res.cloudinary.com/joyjing1/image/upload/c_scale,w_100/v1467599657/icons/LinkedIn_IN_Icon_5inCMYK1.jpg"></img>
          </a>
        </div>
        
      </aside>
    );
  }
});

module.exports = Newsfeed;


  // <Link to="https://github.com/JoyJing1">