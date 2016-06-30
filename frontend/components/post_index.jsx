const React = require('react');
const PostStore = require('../stores/post_store');
const PostActions = require('../actions/post_actions');
const PostIndexItem = require('./post_index_item');

const PostIndex = React.createClass({
  getInitialState() {
    return { posts: PostStore.all() };
  },

  componentWillReceiveProps(newProps) {
    const ids = { receiver_id: newProps.profile.user_id };
    PostActions.fetchManyPosts(ids);
    PostStore.addListener(this._onChange);
    console.log("componentDidMount() in post_index.jsx");
    console.log(ids);
  },

  componentWillUnmount() {
    PostStore.remove(this._onChange);
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
