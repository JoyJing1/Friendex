"use strict";

const Link  = require('react-router').Link
    , React = require('react');

const CommentIndexItem = React.createClass({

  render() {
    return (
      <li className="comment-item">
        <img src={this.props.comment.author_img} className="comment-profile-pic">
        </img>

        <div className="comment-body">
          <Link to={`users/${this.props.comment.user_id}`}>{this.props.comment.author_name}</Link>

          {this.props.comment.body}

          <h6 className="comment-time">
            {$.timeago(this.props.comment.created_at)}
          </h6>
          
        </div>
      </li>
    );
  }

});

module.exports = CommentIndexItem;
