# Phase 2-3: Flux Architecture and Profile CRUD (2.5 days)

## Rails
### Models
* Profile

### Controllers
* Api::ProfilesController (create, update, destroy, show)

### Views
* profiles/show.json.jbuilder
* profiles/edit.json.jbuilder

## Flux
### Views (React Components)
* ProfileAbout
* ProfileEditForm

### Stores
* Profile

### Actions
* ApiActions.receiveSingleProfile -> triggered by ApiUtil
* ApiActions.removeProfile

### ApiUtil
* ApiUtil.createProfile
* ApiUtil.fetchSingleProfile
* ApiUtil.updateProfile
* ApiUtil.destroyProfile

## Gems/Libraries
