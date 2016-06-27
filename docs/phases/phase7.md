# Phase 7: Newsfeed (1 day)

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
  - NewPostForm (developed in phase 6)
  - PostIndexItem (developed in phase 6)
* NewsfeedLinkIndex
* NewsfeedAdIndex

### Stores
* Newsfeed

### Actions
* ApiActions.receiveAllNewsfeedPosts -> triggered by ApiUtil

### ApiUtil
* ApiUtil.fetchAllNewsfeedPosts

## Gems/Libraries
