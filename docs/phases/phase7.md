# Phase 3: Comments (1 day)

## Rails
### Models
* Comments

### Controllers
* Api::CommentsController (create, update, destroy)

### Views
* comments/index.json.jbuilder
* comments/show.json.jbuilder

## Flux
### Views (React Components)
* CommentIndex
  - CommentIndexItem

### Stores
* Comment

### Actions
* ApiActions.receiveAllComments -> triggered by ApiUtil
* ApiActions.receiveSingleComment
* ApiActions.removeComment

### ApiUtil
* ApiUtil.fetchAllComments
* ApiUtil.createComment
* ApiUtil.updateComment
* ApiUtil.destroyComment

## Gems/Libraries
