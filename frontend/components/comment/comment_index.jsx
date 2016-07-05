"use strict";

const React = require('react');

const CommentIndexItem = require('./comment_index_item');

const PostIndex = React.createClass({

  render() {
    return (
      <ul className="comment-index-container">
        {
          this.props.comments.map( comment => {
            return <CommentIndexItem comment={comment} key={comment.id}/>;
          })
        }
      </ul>
    );
  }
});

module.exports = PostIndex;
