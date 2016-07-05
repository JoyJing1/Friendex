"use strict";

const React = require('react');

const ImageStore    = require('../../stores/image_store')
    , PostActions   = require('../../actions/post_actions')
    , PostIndexItem = require('./post_index_item')
    , PostStore     = require('../../stores/post_store')
    , ProfileActions   = require('../../actions/profile_actions')
    , SessionStore       = require('../../stores/session_store');

const PostIndex = React.createClass({
  getInitialState() {
    return { posts: PostStore.all(),
              currentUserProfile: SessionStore.currentUserProfile() };
  },

  componentDidMount() {
    console.log("componentDidMount() in post_index.jsx");
    const ids = { receiver_id: this.props.profile.user_id };
    console.log(ids);
    PostActions.fetchManyPosts(ids);
    this.postListener = PostStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillReceiveProps(newProps) {
    const ids = { receiver_id: newProps.profile.user_id };
    console.log(ids);
    PostActions.fetchManyPosts(ids);
    ProfileActions.fetchCurrentUserProfile();
  },

  componentWillUnmount() {
    this.postListener.remove();
    this.sessionListener.remove();
  },

  _onChange() {
    this.setState( { posts: PostStore.all(),
                    currentUserProfile: SessionStore.currentUserProfile() } );
    console.log("_onChange() in post_index.jsx");
    console.log(this.state);
  },

  render() {
    return (
      <ul>
        {this.state.posts.map( post => {
          return(
            <PostIndexItem post={post}
              key={`${post.type}${post.id}`}
              currentUserProfile={this.state.currentUserProfile}/>
          );
        })}

        {this.props.children}
      </ul>
    );
  }
});

module.exports = PostIndex;
