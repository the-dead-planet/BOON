# Logic

Non-react stuff.

Classes and functions modeling functionality used by the React components,
but not depending on React themselves (e.g. a User object).

If a piece of logic is complex enough to be extracted to a module and doesn't
render anything, it should be decoupled from React and land in this directory.
This approach will allow testing core portions of the app without the overhead
of going through layers of React code.
