# FresherNote

[Friendex live][heroku]

[heroku]: www.friendex.site

Friendex is a full-stack web application inspired by Facebook.  It utilizes Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Flux architectural framework on the frontend.  

## Features & Implementation

### Single-Page App

Friendex is a single-page app; all content is delivered on one static page.  The root page listens to a `SessionStore` and renders content based on a call to `SessionStore.currentUser()`.  Sensitive information is kept out of the frontend of the app.

### User Profiles & About Page
Each `User` has a unique `Profile` which holds all of the personal information about the user that is displayed in their `ProfileAbout` React component. The `ProfileAbout` component is displayed both on the `ProfileTimeline` as well as the `ProfileAboutPage`.

Only `email` (which is used as each user's unique identifier), `password_digest`, and `username` (for ease of displaying the `User`'s display name) are stored in the `users` table. All additional information is stored in the `profiles` table, which holds a `user_id` foreign key that points to the `users` table.

### Friending & Friendships
Each `User` can send and receive Friend Requests, which are stored as `Friendship`s on the backend. The `Friendship` tracks the current `status` of the `Friendship` as  `pending`, `accepted`, or `denied`]. The `ProfileFriendButton` which is displayed in the `ProfileHeader` determines what text to display and what action to perform when clicked, based on the current status of the `currentUser` and `currentProfile`'s friendship status. Clicking "Add Friend" sends an API `POST` request to create a `Friendship`, clicking "Accept Friend Request" or "Remove Friend Request" updates the status of the friendship, and "Cancel Request" removes the `Friendship` from the database.

### Posts



### Photos

### Newsfeed

### Comments

### Likes

### Search


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








### Note Rendering and Editing

  On the database side, the notes are stored in one table in the database, which contains columns for `id`, `user_id`, `content`, and `updated_at`.  Upon login, an API call is made to the database which joins the user table and the note table on `user_id` and filters by the current user's `id`.  These notes are held in the `NoteStore` until the user's session is destroyed.  

  Notes are rendered in two different components: the `CondensedNote` components, which show the title and first few words of the note content, and the `ExpandedNote` components, which are editable and show all note text.  The `NoteIndex` renders all of the `CondensedNote`s as subcomponents, as well as one `ExpandedNote` component, which renders based on `NoteStore.selectedNote()`. The UI of the `NoteIndex` is taken directly from Evernote for a professional, clean look:  

![image of notebook index](noteIndex.png)

Note editing is implemented using the Quill.js library, allowing for a Word-processor-like user experience.

### Notebooks

Implementing Notebooks started with a notebook table in the database.  The `Notebook` table contains two columns: `title` and `id`.  Additionally, a `notebook_id` column was added to the `Note` table.  

The React component structure for notebooks mirrored that of notes: the `NotebookIndex` component renders a list of `CondensedNotebook`s as subcomponents, along with one `ExpandedNotebook`, kept track of by `NotebookStore.selectedNotebook()`.  

`NotebookIndex` render method:

```javascript
render: function () {
  return ({this.state.notebooks.map(function (notebook) {
    return <CondensedNotebook notebook={notebook} />
  }
  <ExpandedNotebook notebook={this.state.selectedNotebook} />)
}
```

### Tags

As with notebooks, tags are stored in the database through a `tag` table and a join table.  The `tag` table contains the columns `id` and `tag_name`.  The `tagged_notes` table is the associated join table, which contains three columns: `id`, `tag_id`, and `note_id`.  

Tags are maintained on the frontend in the `TagStore`.  Because creating, editing, and destroying notes can potentially affect `Tag` objects, the `NoteIndex` and the `NotebookIndex` both listen to the `TagStore`.  It was not necessary to create a `Tag` component, as tags are simply rendered as part of the individual `Note` components.  

![tag screenshot](tagScreenshot.png)
