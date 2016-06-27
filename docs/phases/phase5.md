# Phase 5: Posts (1.5 days)

## Rails
### Models
* Posts

### Controllers
* Api::PostsController (create, update, destroy)

### Views
* posts/index.json.jbuilder
* posts/show.json.jbuilder

## Flux
### Views (React Components)
* PostIndex
  - PostIndexItem
* PostForm

### Stores
* Post

### Actions
* ApiActions.receiveAllPosts -> triggered by ApiUtil
* ApiActions.receiveSinglePost
* ApiActions.removePost

### ApiUtil
* ApiUtil.fetchAllPosts
* ApiUtil.createPost
* ApiUtil.fetchSinglePost
* ApiUtil.updatePost
* ApiUtil.destroyPost

## Gems/Libraries
