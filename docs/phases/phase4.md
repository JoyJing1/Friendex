# Phase 4: Friendships (1.5 days)

## Rails
### Models
* Friendships

### Controllers
* Api::FriendshipsController (create, destroy, update, show)

### Views
* friendships/index.json.jbuilder
* friendships/show.json.jbuilder

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
* Friendship

### Actions
* ApiActions.receiveAllFriendships -> triggered by ApiUtil
* ApiActions.receiveSingleFriendship
* ApiActions.removeFriendship

### ApiUtil
* ApiUtil.fetchAllFriendships
* ApiUtil.createFriendship
* ApiUtil.updateFriendship
* ApiUtil.destroyFriendship

## Gems/Libraries
