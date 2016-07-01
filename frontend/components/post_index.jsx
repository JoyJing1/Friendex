const React = require('react');
const PostStore = require('../stores/post_store');
const PostActions = require('../actions/post_actions');
const PostIndexItem = require('./post_index_item');

const PostIndex = React.createClass({
  getInitialState() {
    return { posts: PostStore.all() };
  },

  componentDidMount() {
    console.log("componentDidMount() in post_index.jsx");
    const ids = { receiver_id: this.props.profile.user_id };
    console.log(ids);
    PostActions.fetchManyPosts(ids);
    this.postListener = PostStore.addListener(this._onChange);
  },

  componentWillReceiveProps(newProps) {
    const ids = { receiver_id: newProps.profile.user_id };
    console.log(ids);
    PostActions.fetchManyPosts(ids);
  },

  componentWillUnmount() {
    this.postListener.remove();
    // PostStore.remove(this._onChange);
  },

  _onChange() {
    this.setState( { posts: PostStore.all() } );
    console.log("_onChange() in post_index.jsx");
    console.log(this.state);
  },

  render() {
    return (
      <ul>
        {this.state.posts.map( post => {
          return(
            <PostIndexItem post={post} key={post.id}/>
          );
        })}

      </ul>
    );
  }
});

module.exports = PostIndex;