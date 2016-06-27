## Component Hierarchy

**Bolded** components are associated with routes.

(:exclamation: Remember, the bolded components are created by their
associated routes, so the nesting of your bolded components must
_**exactly**_ match the nesting of your routes.)

* **App**
  * **LoginPage** (if logged out & no current_user)
    * NewSessionForm
    * LoggedOutContainer - may not be its own component
    * NewUserForm
  * Header (only show if logged in)
    * FriendRequestIndex
      * FriendRequestIndexItem
    * MessageIndex (bonus)
      * MessageIndexItem (bonus)
    * NotificationIndex (bonus)
      * NotificationIndexItem (bonus)
  * **NewsfeedContainer** (IndexRoute - default)
    * NewsfeedIndex
      * NewPostForm
      * PostIndexItem
  * **ProfileContainer**
    * ProfileNavbar (with profile_img and background_img)
    * **ProfileContainer**
      * ProfileSidebar
        * ProfileAbout
        * FriendPicIndex (bonus)
          * FriendPicIndexItem (bonus)
        * PhotoIndex (bonus)
          * PhotoIndexItem (bonus)
      * PostIndex
        * NewPostForm
        * PostIndexItem
    * **ProfileAboutContainer**
      * ProfileAbout
      * FriendIndex (same as on ProfileFriends page)
        * FriendIndexItem (same as on ProfileFriends page)
    * **ProfileAboutEdit**
      * ProfiletEditForm
    * **ProfileFriends**
      * FriendIndex
        * FriendIndexItem



## Routes

* **component:** `App` **path:** `/`
  * **component:** `LoginPage` **path:** none
    * **component:** `NewSessionForm` **path:** create
    * **component:** `NewUserForm` **path:** create
  * **component:** `NewsfeedContainer` **path:** show
  * **component:** `ProfileContainer` **path:** show
  * **component:** `ProfileContainer` **path:** `users/:userId`
    * **component:** `ProfileTimeline` **path:** `users/:userId`
    * **component:** `ProfileAbout` **path:** `users/:userId/about`
    * **component:** `ProfileFriends` **path:** `users/:userId/friends`

NewsfeedContainer is the IndexRoute - default content to be displayed
