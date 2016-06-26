# Phase 3: FriendRequests (2 days)

## Rails
### Models
* FriendRequests
* Friendships

### Controllers
* Api::FriendRequestsController (create, destroy)
* Api::FriendshipsController (create, destroy)

### Views
* friendrequests/index.json.jbuilder
* friendships/index.json.jbuilder
* friends/index.json.jbuilder

## Flux
### Views (React Components)
* FriendRequestIndex
  - FriendRequestIndexItem
* FriendIndex
  - FriendIndexItem
* FriendPicIndex
  - FriendPicIndexItem
* SearchIndex

### Stores
* Friend

### Actions
* ApiActions.receiveAllFriendRequests -> triggered by ApiUtil
* ApiActions.receiveSingleFriendRequest
* ApiActions.removeFriendRequest
* ApiActions.receiveSingleFriendship
* ApiActions.removeFriendship
* ApiActions.receiveAllFriends

### ApiUtil
* ApiUtil.fetchAllFriendRequests
* ApiUtil.createFriendRequest
* ApiUtil.destroyFriendRequest
* ApiUtil.createFriendship
* ApiUtil.destroyFriendship
* ApiUtil.fetchAllFriends

## Gems/Libraries
