const React = require('react');
const FriendshipStore = require('../stores/friendship_store');
const FriendshipActions = require('../actions/friendship_actions');
const FriendRequestIndexItem = require('./friend_request_index_item');

const FriendRequestIndex = React.createClass({
  // getInitialState() {
  //   return { friendRequests: FriendRequestStore.all() };
  // },
  //
  // componentDidMount() {
  //   console.log("componentDidMount() in friendRequest_index.jsx");
  //   const ids = { receiver_id: this.props.profile.user_id };
  //   console.log(ids);
  //   FriendRequestActions.fetchManyFriendRequests(ids);
  //   this.friendRequestListener = FriendRequestStore.addListener(this._onChange);
  // },
  //
  // componentWillReceiveProps(newProps) {
  //   const ids = { receiver_id: newProps.profile.user_id };
  //   console.log(ids);
  //   FriendRequestActions.fetchManyFriendRequests(ids);
  // },
  //
  // componentWillUnmount() {
  //   this.friendRequestListener.remove();
  //   // FriendRequestStore.remove(this._onChange);
  // },
  //
  // _onChange() {
  //   this.setState( { friendRequests: FriendRequestStore.all() } );
  //   console.log("_onChange() in friendRequest_index.jsx");
  //   console.log(this.state);
  // },

  render() {
    console.log('rendering FriendRequestIndex');
    console.log(this.props.friendRequestsReceived);
    // debugger;
    return (
      <div className="friend-request-container">
          <h3>
            <img className="friend-request-icon" src="http://res.cloudinary.com/joyjing1/image/upload/v1467347738/icons/iconmonstr-user-21-240_1.png">
            </img>Friend Requests
          </h3>

          <ul className="friend-request-body">
            {this.props.friendRequestsReceived.map( friend => {
              return <FriendRequestIndexItem friend={friend}/>;
            })}
          </ul>

      </div>
    );
  }
});

module.exports = FriendRequestIndex;

// {this.state.friendRequests.map( friendRequest => {
//   return(
//     <FriendRequestIndexItem friendRequest={friendRequest} key={friendRequest.id}/>
//   );
// })}
