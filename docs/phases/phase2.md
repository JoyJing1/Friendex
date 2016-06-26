# Phase 2: Flux Architecture and Profile CRUD (3 days)

## Rails
### Models

### Controllers
* Api::ProfilesController (create, update, destroy)

### Views
* profiles/show.json.jbuilder

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
