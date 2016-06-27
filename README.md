# Friendex

[Heroku link] [heroku] **Note:** This will be a link to my production site

[heroku]: https://friendex.herokuapp.com/

## Minimum Viable Product

Friendex is a web application inspired by Facebook that will be build using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README
- [ ] Profiles
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Friending
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Comments/Posting on Friends' walls
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] News Feed
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (1 day, W1 Tu 6pm)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin
- [ ] Heroku set up for project

### Phase 2: Profile Model, API, and basic APIUtil (1.5 days, W1 Th 12pm)

**Objective:** Profiles can be created, read, edited and destroyed through
the API.

- [ ] create `Profile` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for profiles (`ProfilesController`)
- [ ] jBuilder views for profiles
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days, W1 F 6pm)

**Objective:** Profiles can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each profile component, building out the flux loop as needed.
  - [ ] `ProfileAbout`
  - [ ] `ProfileEditForm`
- [ ] save Profiles to the DB when the form loses focus or is left idle
  after editing.

### Phase 4: Start Styling (0.5 days, W2 M 12pm)

**Objective:** Existing pages (including signup/signin/profile) will look good.

- [ ] create a basic header - add nested components as they're made
- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Friend Requests (1.5 days, W2 Tu 6pm)

**Objective:** Users can send & receive FriendRequests (create & destroy). Users who have received a friend request can accept or deny (create a friendship, destroy a friend request).

- [ ] create `FriendRequests` model
- [ ] create `Friendships` model
- build out API, Flux loop, and components for:
  - [ ] FriendRequests CRUD
  - [ ] Friendships CRUD
  - [ ] creating a friendship requires a friendrequest
  - [ ] fetching all friends via Friendships table
- [ ] list friendrequests in header
  - [ ] FriendRequestIndex
  - [ ] FriendRequestIndexItem
- Use CSS to style new views

Phase 3 allows users to send & receive friend requests, create friendships, and find a user's friends.

### Phase 6: Posts (1 day, W2 Wed 6pm)

**Objective:** Users can make posts. Users can post on their own wall or a friend's wall

- [ ] create `Post` model
- build out API, Flux loop, and components for:
  - [ ] fetching posts for a profile
  - [ ] adding posts to a profile
  - [ ] deleting posts from a profile
- [ ] Style new elements

### Phase 7: Newsfeed (1 day, W2 Th 6pm)

**objective:** Populate the newsfeed with posts by the user, on the user's profile, and by the user's friends

- [ ] create Newsfeed components
  - [ ] NewsfeedContent component
  - [ ] NewsfeedIndex component
    - [ ] NewPostForm component
    - [ ] PostIndexItem component
  - [ ] NewsfeedLinkIndex component
     - Static links
  - [ ] NewsfeedAdIndex component
    - Static faux ads
    - [ ] NewsfeedAdIndexItem component (extra)
      - [ ] seed ads table (extra)

### Phase 8: Styling Cleanup and Seeding (1 day, W2 F 6pm)

**objective:** Make the site feel cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Notifications
- [ ] Likes
- [ ] Comments on a comment
- [ ] Pagination / infinite scroll for Notes Index
- [ ] Search - by username only
- [ ] Messaging
- [ ] Pictures/albums
- [ ] Multiple sessions

[phase-one]: docs/phases/phase1.md
[phase-two-three]: docs/phases/phase2-3.md
[phase-four]: CSS
[phase-five]: docs/phases/phase5.md
[phase-six]: docs/phases/phase6.md
[phase-seven]: docs/phases/phase7.md
[phase-eight]: docs/phases/phase8.md
