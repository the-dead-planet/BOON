# BOON

A platform for sharing cross team developments, product increments, ideas and roumours about team members.

---

## Requirements

-   Node.js v20.10.0 (lts at the time of writing)
-   Mongo DB

## Installation

Run the following command to install all dependencies:

```
yarn install-all
```

To create a clean environment:

```
yarn clean && yarn install-all
```

It will prune all installed dependencies and fetch the required ones again.
It may help if the environment becomes unstable because of outdated packages.

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

