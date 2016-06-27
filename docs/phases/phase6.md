# Phase 6: Newsfeed (1.5 days)

## Rails
### Models

### Controllers
* Api::NewsfeedController (index)

### Views
* newsfeed/index.json.jbuilder

## Flux
### Views (React Components)
* NewsfeedContent
* NewsfeedIndex
  - PostForm (developed in phase 6)
  - PostIndexItem (developed in phase 6)
* NewsfeedLeftSidebar
* NewsfeedRightSidebar

### Stores
* Newsfeed

### Actions
* ApiActions.receiveAllNewsfeedPosts -> triggered by ApiUtil

### ApiUtil
* ApiUtil.fetchAllNewsfeedPosts

## Gems/Libraries
