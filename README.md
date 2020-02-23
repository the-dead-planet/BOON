# BOON

A platform for sharing cross team developments, product increments, ideas and roumours about team members.

---

## Requirements

-   Node.js
-   Mongo DB

## Installation

Run the following command to install all dependencies:

```
yarn install-all
```

## Testing

To run all tests once:

```
yarn test
```

The "client/" subdirectory supports a more fancy incremental testing mode.
Refer to its package.json for more details.

## Running the app

```
yarn dev
```

## TODO:

```USER
- Add edit route
- Add delete route
- Change to use Windows AD authentication / SSO?

```

```POST
- Add 'edit' buttons
- Display Post comments
- Add dropdown selector for a project to which this post is linked
- Enable new project creation when entering new post data
- Add handle change of project

```

```PROJECT
- Add "Add Project" page
- Disable project deletion if posts are already linked to it
- Test delete route scenarios: try to delete project with posts (failure) and without (success)

```

```COMMENT
- Add edit buttons
-

```

```LIKE
- Define a fixed list of like types
- Add like functionality to Sprints
- Add like functionality to Posts
- Add like functionality to Comment

```

```UI
- change all components

```

```Models
- Create a new model for projects and add a project ID reference to Post model

```

```State
- Add posts and comments to state to allow rendering after comment/post addition

```
