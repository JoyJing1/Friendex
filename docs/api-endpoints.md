# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /api/users/new`
- `POST /api/users`
- `PATCH /api/users`

### Session

- `GET /api/session/new`
- `POST /api/session`
- `DELETE /api/session`

## JSON API

### Users

- `GET /api/users/:id`
  - Returns all user information
- `PATCH /api/users/:id`
  - Checks that current_user can only edit their own profile

### Profiles

- `GET /api/profiles/:id`
  - Returns all profile information
- `POST /api/profiles`
  - Create new profile upon completion of signup
- `PATCH /api/profiles/:id`
  - Checks that current_user can only edit their own profile



### Friendships
- `GET /api/friendships`: returns all friendships
  - Pass params for status to only pull current friends vs open friend requests
- `POST /api/friendships`: create a new friendship
  - Pass params for current_user & request receiver
- `PATCH /api/friendships/:id`: update a friendship
  - Pass params for whether accepting or denying friendship
- `DELETE /api/friendships/:id`: remove a friendship

### Friends

- `GET /api/friends`: get a list of all of a user's friends
  - Pass params with the user_id of the user we're concerned with
  - Accepts a count parameter for the number of friends to return
  - Returns the following information
    - First & last name
    - Profile picture
    - Count of their friends

### Posts

- `GET /api/posts`
  - Pass params with the user whose posts we're concerned with
  - Posts index/search
  - Returns all posts on a user's profile page
  - Accepts a count parameter for the number of posts to return
  - accepts pagination params (if I get there)
- `POST /api/posts`: creates a new post on a user's page
  - Pass params with the receiver of the post
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
- `GET /api/comments`: returns all comments on a post
  - Pass params for the post we're concerned with
  - Returns the total number of comments on a post
  - Accepts a count parameter to only return the # of most recents comments
- `POST /api/comments`: create a new comment on a post
  - Pass params for the post we're concerned with
- `PATCH /api/comments/:commentId`: update a comment on a post
  - Pass params for the post we're concerned with
  - Checks that current_user is the author
- `DELETE /api/comments/:commentId`: remove a comment from post
  - Pass params for the post we're concerned with
  - Allows either the comment_author or the post_author to delete a post

### Likes - Posts

- A post's likes will be included in the post show template
- `GET /api/likes`: returns the number of likes on a post
  - Pass params for the post we're concerned with
  - Pass params to denote like as a post_like
- `POST /api/likes`: create a new like on a post
  - Pass params for the post we're concerned with
  - Pass params to denote like as a post_like
- `DELETE /api/likes/:likeId`: removes a like from a post
  - Pass params to denote like as a post_like

### Likes - Comments

- A comment's likes will be included in the comment show template
- `GET /api/likes`: returns the number of likes on a comment
  - Pass params for the comment we're concerned with
  - Pass params to denote like as a comment_like
- `POST /api/likes`: create a new like on a comment
  - Pass params for the comment we're concerned with
  - Pass params to denote like as a comment_like
- `DELETE /api/likes/:likeId`: removes a like from a comment
  - Pass params to denote like as a comment_like

### Messages
- `GET /api/messages`
  - Pass params for receiver (other user in convo)
  - Returns all messages current_user has written to receiver
  - Returns all messages current_user has received from receiver
  - Accepts params for how many total messages to fetch
- `POST /api/messages`: create a new message from current_user to receiver
  - Pass params for receiver (other user in convo)
  - Messages cannot be deleted once sent
