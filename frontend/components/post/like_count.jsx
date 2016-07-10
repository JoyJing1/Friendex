"use strict";

const React = require('react');

const LikeCount = React.createClass({
  render() {
    return(
      <div className="like-count clearfix">
        <img src="http://res.cloudinary.com/joyjing1/image/upload/c_limit,w_40/v1467829315/icons/fb_fan_15_like.png"></img>
        {this.props.count}
      </div>
    );
  }
});

module.exports = LikeCount;
