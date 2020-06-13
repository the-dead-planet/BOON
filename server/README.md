# Server

## Structure

Source files (both .js and .ts) are located under src/, along with their tests.
The typescript compiler will transpile all files from src/ to built/, according
to rules specified in tsconfig.js.

## Compilation

To compile the code, run `yarn build`.
Remember, that you must always build the project before starting a server.

The built/ folder will be populated regardless of type checking status. You can
still run the code, even if it contains type errors. It is recommended not to ignore
them, though.

### JS -> TS migration

The compiler allows mixing JS and TS files. However, only TS files are type checked.
Our goal is to enable type checking for all src/ files and, when done, forbid
using plain .js files.

To enable type checking of a file, simply change its extension from `.js` to `.ts`.
It will most likely lead to compilation errors and require annotating the code
with type signatures. See [the migration guide](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
for details.

### Clean

If you run into issues with the compiler, try running `yarn clean`. It will remove
cached transpilation results.

## Testing

`yarn test` will pick up all test files in src/, transpile the dependencies and
display a summary. You do _not_ need to manually transpile src files before
each test.
