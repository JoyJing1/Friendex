"use strict";

const React = require('react');

const CommentIndexItem = require('./comment_index_item');

// const ImageStore    = require('../../stores/image_store')
    // , PostActions   = require('../../actions/post_actions')
    // , PostIndexItem = require('./post_index_item')
    // , PostStore     = require('../../stores/post_store')
    // , ProfileActions   = require('../../actions/profile_actions')
    // , SessionStore       = require('../../stores/session_store');

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


// {this.state.posts.map( post => {
//   return(
//     <PostIndexItem post={post}
//       key={`${post.type}${post.id}`}
//       currentUserProfileImg={this.state.currentUserProfileImg}/>
//   );
// })}
//
// {this.props.children}
