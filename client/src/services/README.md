# Services

Definitions and implementations of all external services.

## The usual apprach

The common React pattern is to define individual services as singletons in
separate files and importing them directly in each component. However, this
approach makes it a bit tricky to mock and test with service implementations -
each service has to be mocked individually and each test must remember to mock
all dependencies explicitly, or else the behaviour will be undefined.

## Our approach

The approach taken here is to treat services just like any other React object,
passing them by props from the parent component. To make things a bit less
annoying, all services will be packed into a single type of type `Services`,
injected through a [Context](https://reactjs.org/docs/context.html).

Components talking to a service will call `useServices`, just like with themes
and other Context-backed features.

The top level component is expected to receive an instance of `Services` during
construction. This will make it possible to inject a mock instance if needed.
