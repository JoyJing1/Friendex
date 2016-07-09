# Friendex

[Friendex live][heroku]

[heroku]: www.friendex.site

Friendex is a full-stack web application inspired by Facebook.  It utilizes Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Flux architectural framework on the frontend.  

## Features & Implementation

### Single-Page App

Friendex is a single-page app; all content is delivered on one static page.  The root page listens to a `SessionStore` and renders content based on a call to `SessionStore.currentUser()`.  Sensitive information is kept out of the frontend of the app.

Components were developed modularly for ease of use and re-use (ex: the same `NewPostForm` is used when viewing the current user's Newsfeed as well as another user's Timeline). The app was developed in a SCRUM-like manner, with Potentially Shippable Increments (PSI) of the app at the completion of each feature.

![login-page]
[login-page]: ./screenshots/login-page.png

### User Profiles & About Page
Each `User` has a unique `Profile` which holds all of the personal information about the user that is displayed in their `ProfileAbout` React component. The `ProfileAbout` component is displayed both on the `ProfileTimeline` as well as the `ProfileAboutPage`.

![friend-timeline]
[friend-timeline]: ./screenshots/friend-timeline.png

Only `email` (which is used as each user's unique identifier), `password_digest`, and `username` (for ease of displaying the `User`'s display name) are stored in the `users` table. All additional information is stored in the `profiles` table, which holds a `user_id` foreign key that points to the `users` table.

![profile-about]
[profile-about]: ./screenshots/profile-about.png

### Friending & Friendships
Each `User` can send and receive Friend Requests, which are stored as `Friendship`s on the backend. The `Friendship` has a `requestor_id` and a `receiver_id` and tracks the current `status` of the `Friendship` as  `pending`, `accepted`, or `denied`. The `ProfileFriendButton`, which is displayed in the `ProfileHeader`, determines what text to display and what action to perform when clicked, based on the `currentUser` and `currentProfile`'s friendship status. Clicking "Add Friend" sends an API `POST` request to create a `Friendship`. Clicking "Accept Friend Request" or "Remove Friend Request" updates the status of the friendship. The "Cancel Request" button removes the `Friendship` from the database.

![friends]
[friends]: ./screenshots/friends.png

### Posts
Users' main method of interacting with their friends is through `Post`s. Each `Post` React component holds an `author_id`, `receiver_id` (this tracks whose profile the post was written on. Newsfeed posts are recorded as a user posting on their own page), and the `body` of the post. On a user's `ProfileTimeline`, all `Post`s where they were the receiver are displayed in descending chronological order (from most recent to oldest posts). The `ProfileTimeline` also includes a `NewPostForm` above the `PostIndex` for users to write a new `Post`. The prompt text in the `NewPostForm` is generated dynamically depending on where the current user is viewing the form (from their Newsfeed, Timeline, or someone else's Timeline).

Users can delete posts by clicking a "Remove Post" button that is displayed in the bottom-right corner of the `PostIndexItem`. This button is only displayed when the current user is either the author or the receiver of the post.

### Images / Photos
Users can upload `Image`s to share with their friends. Users can either upload them to their own profiles via the `PhotosPage` on their profile, or via an image `Post` on a friend's Timeline (or their own Newsfeed). All `Image`s that a user has uploaded are displayed in the `PhotosPage` via `PhotoItem`s.

![profile-photos]
[profile-photos]: ./screenshots/profile-photos.png

Each `PhotoItem` generate a modal when clicked on. In the modal view, if the currentUser was the one who uploaded the image, a `Remove Photo` button is provided to delete the photo from the database.

![photo-modal]
[photo-modal]: ./screenshots/photo-modal.png

Images are hosted on Cloudinary and `Image`s hold very similar information to `Post`s. They have an `author_id`, `receiver_id`, and `url` for where the image is stored on Cloudinary.

Because of the similar structure between `Post`s and `Image`s, they are both rendered in the `PostItemIndex` and `NewsfeedIndex` as `PostIndexItem`s. The `PostIndexItem` React component handles the logic for how to display a text post versus an image post using a `type` parameter.

### Newsfeed
The `NewsfeedStore` is very simmilar to the `PostStore`, but tracks all new `Friendship`s as well as `Post`s (both text and image posts) where the current user or any of their friends are involved. The `NewsfeedStore` listens to `dispatches` involving posts, images, friendships, comments, likes, and the newsfeed.

![newsfeed-items]
[newsfeed-items]: ./screenshots/newsfeed-items.png

On the backend, the `Newsfeed Controller` pulls all relevant posts, images, and friendships, and returns them in a chronologically sorted array. An array data structure was chosen because Newsfeed items should always be displayed in chronological order, and individual items can be updated via primary key ids. The following Ruby code pulls relevant Newsfeed items (posts, friendships, and images are custom-made methods that pull items based on a list of `user_id`s):

```ruby
class Api::NewsfeedsController < ApplicationController

  def show
    user = User.find(params["id"])
    ids = [ user.id ]

    user.friends.each do |friend|
      ids.push(friend.friend_id)
    end

    posts = posts(ids)
    posts.each { |item| item.type = "post" }

    friendships = friendships(ids)
    friendships.each { |item| item.type = "friendship" }

    images = images(ids)
    images.each { |item| item.type = "image" }

    @newsfeed = posts.concat(friendships)
                      .concat(images)
                      .sort do |e1, e2|
                        e2.updated_at <=> e1.updated_at
                      end
    render "api/newsfeeds/show"
  end

end
```

The Newsfeed view also incldues a `NewPostForm` for the current user to post from their current activities.

![newsfeed-1]
[newsfeed-1]: ./screenshots/newsfeed-1.png

### Comments
Comments are stored in three separate tables for `PostComment`s, `ImageComment`s, and `FriendshipComment`s. Each comment tracks its relevant `post_id`, `image_id`, or `friendship_id` as well as the `user_id` of its author and the `body` of the comment. Rather than having a separate `CommentStore` to track comments, each `Post`, `Image`, and `Friendship` tracks its own list of `comments` in a chronologically sorted array. When a new `Comment` is made, both the `PostStore` and `NewsfeedStore` listen for the dispatch, and update their version of the post, image, or friendship accordingly.

Thus, when a comment is made from the `ProfileTimeline` tab, it will also appear on the `Newsfeed`. Currently, users are not able to delete comments they have made. So be careful what you comment on!!

![post-comments]
[post-comments]: ./screenshots/post-comments.png

Future improvements would involve refactoring the current Comments code to store all of the comments in one `comments` table and set up polymorphic associations between the `posts`, `images`, and `friendships` tables. Another improvement would involve adding a "Remove Comment" button that would appear for the author of the comment, the author and recipient of the post/image, and both participants in the friendship.

### Likes
Similar to comments, `Like`s are currently stored in three separate tables: `post_likes`, `image_likes`, and `friendship_likes`. They have a single foreign key (`post_id`, `image_id`, or `friendship_id`) pointing to their relevant item as well as the `user_id` of the user who liked the item. This table is a join table that tracks the boolean relationship between an item and a user. If a row is present, the user likes the item, otherwise they do not.

The `PostStore` and `NewsfeedStore` also listen to the `LikeActions` dispatches to update their relevant items appropriately.

At the bottom of each `PostIndexItem`, the number of `likes` a post has are displayed. The `LikeButton` also toggles to blue when the current user likes an item.

### Search
Users are able to search for more friends using the `SearchBar` React component in the `Header`. The `SearchBar` calls a `SearchAction` that executes a simple Active Record query to pull all users whose usernames match the query string.

```ruby
class Api::SearchController < ApplicationController

  def index
    query = params[:query]
    @users = User.where("username LIKE '%#{query}%' OR username LIKE '%#{query.downcase}%' OR username LIKE '%#{query.capitalize!}'")

    render "api/search/index"
  end

end
```

Clicking on a search result will bring you to that user's `ProfileAbout` tab, where the current user can then click around to see the user's photos, about page, and current friends. From the user's profile, the current user can send them a friend request using the "Add Friend" button.

![searchbar]
[searchbar]: ./screenshots/searchbar.png

A future improvement on the `SearchBar` feature would be to also pull query results by location/hometown/current_city/workplace or other profile details.


## Future Directions for the Project
In addition to the features already implemented, I plan to continue improving this project. The next steps for Friendex are outlined below.

### Infinite Scroll
As the number of users, activity, and content increases, it will become unwieldy to pull all relevant events each time a component is rendered. I will implement infinite scrolling by passing back the `updated_at` datetime of the last object in the `NewsfeedStore` and `PostStore` as a parameter to determine what additional posts to pull. Ruby will pull the next `n` relevant posts based on the timestamp and add them to the `NewsfeedStore` and `PostStore`.

### Push Notifications
When a friend performs an action that would be added to a user's `NewsfeedStore` or `PostStore`, the action will be pushed to the current user, and added to their `NewsfeedStore` and `PostStore`. Each user will have to listen to all of their friends' channels, and every time an action is made (new post/comment/like/image) by a friend, the event will be published to that friend's channel.

### Notifications
Once push notifications are implemented, I will add a `NotificationsIndex` to the top-right of the `Header`, which will display a count of the unread notifications, as well as a list of current `NewsfeedIndexItems` (ie the events that caused the notifications).

### Find Friends
Finding and connecting with friends when a user first makes a new account is crucial for them to value and utilize the social networking platform. To help new users find friends who currently have an account, I will implement a `FindFriendIndex` component to be displayed in the `NewsfeedLeft` sidebar, under the list of links. This will display a list of 8-12 other users with their profile images (and potentially their names) in a `FindFriendIndexItem` that will redirect to that user's profile page.

### Friends List on Timeline
I will add a modified `FriendIndex` to the `profile-left` aside in the `ProfileTimeline` component. This will display a shortened list of the profile user's Friends (8-12) so that other users visiting their page can more easily find connections without having to go to the profile's About tab.

### About Edit Form
New users can currently update their `profile_img` and `background_img` by clicking on their current images, and uploading a new photo. I will add a link in the `ProfileAbout` component to render a `ProfileAboutEdit` form that will enable users to edit & update their current account information. They will be able to add additional personal information (`workplace`, `current_city`, `hometown`, `relationship`) which will be rendered in the `ProfileAbout` component.
