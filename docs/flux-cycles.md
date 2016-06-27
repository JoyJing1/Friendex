# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.


## Profile Cycles

### Profiles API Request Actions

* `createProfile`
  0. invoked from new profile button `onClick`
  0. `POST /api/users` is called.
  0. `receiveSingleProfile` is set as the callback.

* `fetchSingleProfile`
  0. invoked from `ProfileAbout` `didMount`/`willReceiveProps`
  0. `GET /api/users/:id` is called.
  0. `receiveSingleProfile` is set as the callback.

* `updateProfile`
  0. invoked from `ProfileEditForm` `onSubmit`
  0. `PATCH /api/users/:id` is called.
  0. `receiveSingleProfile` is set as the callback.

* `destroyProfile`
  0. invoked from delete profile button `onClick`
  0. `DELETE /api/users/:id` is called.
  0. `removeProfile` is set as the callback.

### Profiles API Response Actions

* `receiveSingleProfile`
  0. invoked from an API callback.
  0. `Profile` store updates `_profile` and emits change.

* `removeProfile`
  0. invoked from an API callback.
  0. `Profile` store removes `_profile` and emits change.

### Store Listeners

* `ProfileAbout` component listens to `Profile` store.


## Friendship Cycles

### Friendship API Request Actions
* `fetchAllFriendships`
  0. invoked from `FriendIndex` `didMount`/`willReceiveProps`
  0. invoked from `FriendRequestIndex` `didMount`/`willReceiveProps`
  0. `GET /api/friendships` is called.
  0. `receiveAllFriendships` is set as the callback.

* `createFriendship`
  0. invoked from Add Friend button `onClick`
  0. `POST /api/friendships` is called.
  0. `receiveSingleFriendship` is set as the callback.

* `updateFriendship`
  0. invoked from Accept/Deny buttons `onClick`
  0. `POST /api/friendships` is called.
  0. `receiveSingleFriendship` is set as the callback.

* `destroyFriendship`
  0. invoked from Unfriend button `onClick`
  0. `DELETE /api/friendrequests/:id` is called.
  0. `removeFriendship` is set as the callback.

### Friendship API Response Actions

* `receiveAllFriendships`
  0. invoked from an API callback.
  0. `Friendship` store updates `_friendships[id]` and emits change.

* `receiveSingleFriendship`
  0. invoked from an API callback.
  0. `Friendship` store updates `_friendships[id]` and emits change.

* `removeFriendship`
  0. invoked from an API callback.
  0. `Friendship` store removes `_friendships[id]` and emits change.

### Store Listeners

* `FriendIndex` component listens to `Friendship` store.
* `FriendRequestIndex` component listens to `Friendship` store.
* `FriendPicIndex` component listens to `Friendship` store.

### Store Listeners

* `FriendIndex` component listens to `Friends` store.
* `FriendPicIndex` component listens to `Friends` store.


## Posts Cycles

### Posts API Request Actions

* `fetchAllPosts`
  0. invoked from `PostsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/posts` is called.
  0. `receiveAllPosts` is set as the callback.

* `createPost`
  0. invoked from PostForm `onSubmit`
  0. `POST /api/posts` is called.
  0. `receiveSinglePost` is set as the callback.

* `fetchSinglePost`
  0. invoked from `PostIndexItem` `didMount`/`willReceiveProps`
  0. `GET /api/posts/:id` is called.
  0. `receiveSinglePost` is set as the callback.

* `updatePost`
  0. invoked from `PostForm` `onSubmit`
  0. `PATCH /api/posts/:id` is called.
  0. `receiveSinglePost` is set as the callback.

* `destroyPost`
  0. invoked from Delete Post button `onClick`
  0. `DELETE /api/posts/:id` is called.
  0. `removePost` is set as the callback.

### Posts API Response Actions

* `receiveAllPosts`
  0. invoked from an API callback.
  0. `Post` store updates `_posts` and emits change.

* `receiveSinglePost`
  0. invoked from an API callback.
  0. `Post` store updates `_posts[id]` and emits change.

* `removePost`
  0. invoked from an API callback.
  0. `Post` store removes `_posts[id]` and emits change.

### Store Listeners

* `PostIndex` component listens to `Post` store.
* `PostIndexItem` component listens to `Post` store.


## Newsfeed Cycles

### Newsfeed API Request Actions

* `fetchAllNewsfeedPosts`
  0. invoked from `NewsfeedIndex` `didMount`/`willReceiveProps`
  0. `GET /api/newsfeed` is called.
  0. `receiveAllNewsfeedPosts` is set as the callback.

### Newsfeed API Response Actions

* `receiveAllPosts`
  0. invoked from an API callback.
  0. `Newsfeed` store updates `_newsfeed_posts` and emits change.

### Store Listeners

* `NewsfeedIndex` component listens to `Newsfeed` store.


## BONUS

## Comments Cycles

### Comments API Request Actions

* `fetchAllComments`
  0. invoked from `CommentsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/comments` is called.
  0. `receiveAllComments` is set as the callback.

* `createComment`
  0. invoked from New Comment form `onSubmit`
  0. `POST /api/comments` is called.
  0. `receiveSingleComment` is set as the callback.

* `updateComment`
  0. invoked from `CommentForm` `onSubmit`
  0. `PATCH /api/comments/:id` is called.
  0. `receiveSingleComment` is set as the callback.

* `destroyComment`
  0. invoked from Delete Comment button `onClick`
  0. `DELETE /api/comments/:id` is called.
  0. `removeComment` is set as the callback.

### Comments API Response Actions

* `receiveAllComments`
  0. invoked from an API callback.
  0. `Comment` store updates `_comments` and emits change.

* `receiveSingleComment`
  0. invoked from an API callback.
  0. `Comment` store updates `_comments[id]` and emits change.

* `removeComment`
  0. invoked from an API callback.
  0. `Comment` store removes `_comments[id]` and emits change.

### Store Listeners

* `CommentIndex` component listens to `Comment` store.
* `CommentIndexItem` component listens to `Comment` store.


## Like Cycles

### Like API Request Actions

* `fetchAllLikes`
  0. invoked from `PostLikeIndex` `didMount`/`willReceiveProps`
  0. invoked from `CommentLikeIndex` `didMount`/`willReceiveProps`
  0. `GET /api/likes` is called.
  0. `receiveAllLikes` is set as the callback.

* `createLike`
  0. invoked from Add Like button `onClick`
  0. `POST /api/likes` is called.
  0. `receiveSingleLike` is set as the callback.

* `destroyLike`
  0. invoked from UnLike button `onClick`
  0. `DELETE /api/likes/:id` is called.
  0. `removeLike` is set as the callback.

### Like API Response Actions

* `receiveAllLikes`
  0. invoked from an API callback.
  0. `PostLike` store updates `_post_likes` and emits change.
  0. `CommentLike` store updates `_comment_likes` and emits change.

* `receiveSingleLike`
  0. invoked from an API callback.
  0. `PostLike` store updates `_post_likes[id]` and emits change.
  0. `CommentLike` store updates `_comment_likes[id]` and emits change.

* `removeLike`
  0. invoked from an API callback.
  0. `PostLike` store removes `_post_likes[id]` if it's a post_like and emits change.
  0. `CommentLike` store removes `_comment_likes[id]` if it's a comment_like and emits change.

### Store Listeners

* `PostLikeIndex` component listens to `PostLike` store.
* `PostLikeIndexItem` component listens to `PostLike` store.
* `CommentLikeIndex` component listens to `CommentLike` store.
* `CommentLikeIndexItem` component listens to `CommentLike` store.


## Message Cycles

### Message API Request Actions

* `fetchAllMessages`
  0. invoked from `MessageIndex` `didMount`/`willReceiveProps`
  0. `GET /api/messages` is called.
  0. `receiveAllMessages` is set as the callback.

* `createMessage`
  0. invoked from New Message form `onSubmit`
  0. `POST /api/messages` is called.
  0. `receiveSingleMessage` is set as the callback.

### Message API Response Actions

* `receiveAllMessages`
  0. invoked from an API callback.
  0. `Message` store updates `_messages` and emits change.

* `receiveSingleMessage`
  0. invoked from an API callback.
  0. `Message` store updates `_messages[id]` and emits change.

### Store Listeners

* `MessageIndex` component listens to `Message` store.
* `MessageIndexItem` component listens to `Message` store.
