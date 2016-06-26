# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Users

- `GET /api/users/:id`
  - Returns all profile information
- `PATCH /api/users/:id`
  - Checks that current_user can only edit their own profile
<!-- - `DELETE /api/users/:id`
  - Extra feature - don't allow users to delete accounts in first round
  - Only allow current_user to delete their own profile -->

### Friend Requests
- `GET /api/friendrequests`: returns all open friend requests for current_user
- `POST /api/users/:userId/friendrequests`: create a new friend request
  - Trigger a notification to receiver that they have a new friend request
- `DELETE /api/uesrs/:id/friendrequests`: delete a previously made friend request

### Friendships
- `POST /api/users/:userId/friendships`: create a new friendship
- `DELETE /api/users/:userId/friendships/:id`: remove a friendship

### Friends

- `GET /api/users/:userId/friends`: get a list of all of a user's friends
  - Accepts a count parameter for the number of friends to return
  - Returns the following information
    - First & last name
    - Profile picture
    - Count of their friends

### Posts

- `GET /api/users/:userId/posts`
  - Posts index/search
  - Returns all posts on a user's profile page
  - Accepts a count parameter for the number of posts to return
  - accepts pagination params (if I get there)
- `POST /api/users/:userId/posts`: creates a new post on a user's page
- `GET /api/posts/:id`: gets a particular post
- `PATCH /api/posts/:id`: updates a particular post
- `DELETE /api/posts/:id`: deletes a post
  - Either the author or the receiver can delete a post

### Newsfeed
- `GET /api/newsfeed`
  - Returns most recent:
    - Posts by the user
    - Posts on user's profile
    - Posts by the user's friends

## BONUS

### Comments

- A post's comments will be included in the post show template
- `GET /api/posts/:postId/comments`: returns all comments on a post
  - Returns the total number of comments on a post
  - Accepts a count parameter to only return the # most recents comments
- `POST /api/posts/:postId/comments`: create a new comment on a post
- `PATCH /api/posts/:postId/comments/:commentId`: update a comment on a post
  - Checks that current_user is the author
- `DELETE /api/posts/:postId/comments/:commentId`: remove a comment from post
  - Allows either the comment_author or the post_author to delete a post

### Likes - Posts

- A post's likes will be included in the post show template
- `GET /api/posts/:postId/likes`: returns the number of likes on a post
- `POST /api/posts/:postId/likes`: create a new like on a post
- `DELETE /api/posts/:postId/likes/:likeId`: removes a like from a post

### Likes - Comments

- A comment's likes will be included in the comment show template
- `GET /api/comments/:commentId/likes`: returns the number of likes on a comment
- `POST /api/comments/:commentId/likes`: create a new like on a comment
- `DELETE /api/comments/:commentId/likes/:likeId`: removes a like from a comment

### Messages
- `GET /api/messages/:receiverId`
  - Returns all messages current_user has written to receiver
  - Returns all messages current_user has received from receiver
  - Accepts params for how many total messages to fetch
- `POST /api/messages/:receiverId`: create a new message from current_user to receiver
  - Messages cannot be deleted once sent
