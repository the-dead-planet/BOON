# React Material-UI styled components

This folder should store all basic components from Material-UI with overwritten default css classes.
These components are the global components reused everywhere in the app.

Additional classes, specific for a single instance of these components, can be added in the outer components built with use of the default MUI components.

If you need to change the default styling from MUI, create a basic component and overwrite the MUI classes instead of adding new ones n top.

## Documentation

Example:
https://material-ui.com/customization/components/#shorthand

TypeScript and use of theme props:
https://material-ui.com/guides/typescript/#usage-of-withstyles

## File names

Create file names which correspond to default MUI components.
You can create and export multiple styled components in one file.
