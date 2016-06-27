## Component Hierarchy

**Bolded** components are associated with routes.

(:exclamation: Remember, the bolded components are created by their
associated routes, so the nesting of your bolded components must
_**exactly**_ match the nesting of your routes.)

* **App**
  * **LoginPage** (if logged out & no current_user)
    * NewSessionForm
    * LoggedOutContent - may not be its own component
    * NewUserForm
  * Header (only show if logged in)
    * FriendRequestIndex
      * FriendRequestIndexItem
    * MessageIndex
      * MessageIndexItem
    * NotificationIndex (extra)
      * NotificationIndexItem (extra)
  * **NewsfeedContent** (IndexRoute - default)
    * NewsfeedLinks
    * NewsfeedIndex
      * NewPostForm
      * PostIndexItem
    * NewsfeedAds
  * **ProfileContent**
    * ProfileNavbar (with profile_img and background_img)
    * **ProfileContent**
      * ProfileSidebar
        * ProfileAbout
        * FriendPicIndex
          * FriendPicIndexItem
        * PhotoIndex (extra)
          * PhotoIndexItem (extra)
      * PostIndex
        * NewPostForm
        * PostIndexItem
    * **ProfileAbout**
      * ProfileAboutSidebar
      * ProfileAbout
      * FriendIndex (same as on ProfileFriends page)
        * FriendIndexItem (same as on ProfileFriends page)
    * **ProfileAboutEdit**
      * Sidebar
      * ProfiletEditForm
    * **ProfileFriends**
      * FriendIndex
        * FriendIndexItem



## Routes

* **component:** `App` **path:** `/`
  * **component:** `LoginPage` **path:** none
    * **component:** `NewSessionForm` **path:** create
    * **component:** `NewUserForm` **path:** create
  * **component:** `NewsfeedContent` **path:** show
  * **component:** `ProfileContent` **path:** show
  * **component:** `ProfileContent` **path:** `users/:userId`
    * **component:** `ProfileTimeline` **path:** `users/:userId`
    * **component:** `ProfileAbout` **path:** `users/:userId/about`
    * **component:** `ProfileFriends` **path:** `users/:userId/friends`

NewsfeedContent is the IndexRoute - default content to be displayed
