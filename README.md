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

```
ROUTES
- Create a generic routes file and reuse in all other ones

```

```
FORMS
- Create a generic form to be used in all other ones

```

```
USER
- Add edit route
- Add delete route
- Change to use Windows AD authentication / SSO?

```

```
SPRINT
- Add validation to sprint number
- Prefill dates in form based on the latest dateTo

```

```
POST
- Add 'edit' buttons
- Display Post comments
- Enable new project creation when entering new post data

```

```
PROJECT
- Test delete route scenarios: try to delete project with posts (failure) and without (success)
- Add Project Group ???

```

```
COMMENT
- Add edit buttons
- Change component to expandable one / do not show input component by default

```

```
LIKE
- Define a fixed list of like types
- Add like functionality to Sprints
- Add like functionality to Posts
- Add like functionality to Comment

```

```
UI
- Change input fields in forms: Login, Register, Add/Edit Project, Add/Edit Sprint
- Use layout components across the app

```

```
Models
-

```

```
State
- Add posts and comments to state to allow rendering after comment/post addition

```

```
CSS / styles
- Current way of dealing with styles and CSS is messy - think of a more sophisticated and ordered way to handle styles

```

```
Statistics
- Add a page with some tables or charts showing the number of sprints, projects etc

```
