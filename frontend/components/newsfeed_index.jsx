const React = require('react');
const SessionStore = require('../stores/session_store');
const PostStore = require('../stores/post_store');
const NewsfeedStore = require('../stores/newsfeed_store');
const NewsfeedActions = require('../actions/newsfeed_actions');
const NewsfeedIndexItem = require('./newsfeed_index_item');
const NewPostForm = require('./new_post_form');

const NewsfeedIndex = React.createClass({
  getInitialState() {
    return { newsfeed: NewsfeedStore.all() };
  },

  componentDidMount() {
    console.log("componentDidMount() in newsfeed_index.jsx");
    const id = SessionStore.currentUser().id;
    NewsfeedActions.fetchNewsfeed(id);
    this.newsfeedListener = NewsfeedStore.addListener(this._onChange);
    // this.postListener = PostStore.addListener(this._onChange);
  },

  componentWillReceiveProps(newProps) {
    const id = SessionStore.currentUser().id;
    // debugger;
    NewsfeedActions.fetchNewsfeed(id);
  },

  componentWillUnmount() {
    this.newsfeedListener.remove();
    // this.postListener.remove();
  },

  _onChange() {
    this.setState( { newsfeed: NewsfeedStore.all() } );
    console.log("_onChange() in newsfeed_index.jsx");
    console.log(this.state);
  },

  render() {
    const profile = {id: SessionStore.currentUser().id};
    return (
      <ul>
        <NewPostForm profile={profile}/>

        { this.state.newsfeed.map( news => {
          return <NewsfeedIndexItem news={news} key={news.type+news.id}/>;
        })}
      </ul>
    );
  }
});

module.exports = NewsfeedIndex;