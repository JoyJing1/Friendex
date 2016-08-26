"use strict";

const React = require('react');

const ImageStore      = require('../../stores/image_store')
    , PostActions     = require('../../actions/post_actions')
    , PostIndexItem   = require('./post_index_item')
    , PostStore       = require('../../stores/post_store')
    , ProfileActions  = require('../../actions/profile_actions')
    , SessionStore    = require('../../stores/session_store');

const PostIndex = React.createClass({
  getInitialState() {
    return { posts: PostStore.all() };
  },

  componentDidMount() {
    const ids = { receiver_id: this.props.profile.user_id };
    PostActions.fetchManyPosts(ids);
    this.postListener = PostStore.addListener(this._onChange);
  },

  componentWillReceiveProps(newProps) {
    const ids = { receiver_id: newProps.profile.user_id };

    PostActions.fetchManyPosts(ids);
    ProfileActions.fetchCurrentUserProfile();
  },

  componentWillUnmount() {
    this.postListener.remove();
  },

  _onChange() {
    this.setState( { posts: PostStore.all() });
  },

  render() {
    return (
      <ul>
        {this.state.posts.map( post => {
          return(
            <PostIndexItem post={post}
              key={`${post.type}${post.id}`}
              currentUserProfile={this.props.currentUserProfile}/>
          );
        })}

        {this.props.children}
      </ul>
    );
  }
});

module.exports = PostIndex;
