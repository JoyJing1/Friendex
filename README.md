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
  - [ ] Seed data for demo user so that example profile has the following:
    - [ ] Timeline/Posts
    - [ ] About
    - [ ] Friends
    - [ ] profile_img
    - [ ] background_img
  - [ ] Visually looks like Facebook's profile page
- [ ] Friending
  - [ ] Users can make friend requests
  - [ ] Users can receive friend requests
  - [ ] Users can accept friend requests
  - [ ] Users can see a list of their friends
  - [ ] Demo user will have enough seed data to have a pre-existing list of friends
  - [ ] Lists of friends on profile will look clean & professional
- [ ] Posting
  - [ ] Users can post on their friends' walls (on friend's profile page)
  - [ ] Users can post on their own wall (on newsfeed page)
  - [ ] Users can see posts made on their walls
  - [ ] Users can see posts made on friends' walls
  - [ ] Seed data on demo user's account so that profile posts are not empty
  - [ ] Profile posts look similar to Facebook posts
- [ ] News Feed
  - [ ] Users can see posts in their newsfeed
  - [ ] Seed data on demo user's account so that newsfeed is not empty
  - [ ] Newsfeed looks similar to Facebook newsfeed

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

### Phase 1: Backend setup and Front End User Authentication (1.5 days, W1 Wed 12pm)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] user signup/signin pages
- [x] blank landing page after signin
- [x] Heroku set up for project
- [x] Basic styling for new user & new session forms

### Phase 2: Profile Model, API, and basic APIUtil (1.5 days, W1 Th 6pm)

**Objective:** Profiles can be created, read, edited and destroyed through
the API.

- [x] create `Profile` model
- [x] seed the database with a small amount of test data
- [x] CRUD API for profiles (`ProfilesController`)
- [x] jBuilder views for profiles
- [x] setup Webpack & Flux scaffold
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console.
- [x] setup Cloudinary to host `profile_img`s and `background_img`s

### Phase 3: Flux Architecture and Router (1 day, W1 Fri 6pm)

**Objective:** Profiles can be created and read
user interface (edited & destroyed are bonus).

- [x] setup the flux loop with skeleton files
- [x] setup React Router
- implement each profile component, building out the flux loop as needed.
  - [x] `ProfileAbout`
  - [ ] `ProfileEditForm` (bonus)
- [ ] save Profiles to the DB when the form loses focus or is left idle
  after editing. (bonus)

### Phase 4: Posts (1.5 day, W2 Tues 12pm)

  **Objective:** Users can make posts. Users can post on their own wall or on a friend's wall

  - [x] create `Post` model
  - build out API, Flux loop, and components for:
  - [x] fetching posts for a profile
  - [x] adding posts to a profile
  - [x] deleting posts from a profile
  - [x] Style new elements

### Phase 5: Friendships (1.5 day, W2 Wed 6pm)

**Objective:** Users can send & receive Friend Requests (create & destroy `Friendship`s). Users who have received a friend request can accept or deny (update status of `Friendship`). Users profile page should display all of user's friends.

- [x] create `Friendship` model
- build out API, Flux loop, and components for:
  - [x] `Friendship`s CRUD
  - [x] fetching all friends via Friendships table
- [ ] list friend requests in Profile-Friends tab
  - [ ] list friend requests in header (bonus - later)
  - [ ] `FriendRequestIndex`
  - [ ] `FriendRequestIndexItem`
- [ ] list friends in Profile-Friends tab
  - [ ] `FriendIndex`
  - [ ] `FriendIndexItem`
- Use CSS to style Friend Requests & current Friends


### Phase 6: Newsfeed (1.5 days, W2 Fri 12pm)

**objective:** Populate the newsfeed with posts by the user, on the user's profile, and by the user's friends

- [ ] create Newsfeed components
  - [ ] `NewsfeedContent` component
    - [ ] `NewsfeedIndex` component
      - [ ] `PostForm` component
      - [ ] `PostIndexItem` component
    - [ ] `NewsfeedLeftSidebar` component
     - Static links
    - [ ] `NewsfeedRightSidebar` component
     - Static content (perhaps `FriendPicIndex`)

### Phase 7: Final Cleanup & Polishing (0.5 day, W2 F 6pm)

**objective:** Make the site feel cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Likes
- [ ] Comments on a post
- [ ] Notifications
- [ ] Nest notifications & friend requests in Header
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
