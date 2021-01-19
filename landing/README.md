# Landing

Landing page is implemented in a separate module, because it aims to solve
different goals than the client.
It is not really related to the app in any way, other than by providing a
link to the app.

## Gatsby

Landing page is implemented with [gatsby](gatsbyjs.com).

In short, Gatsby takes care of applying multiple optimizations to a react site,
including server side rendering, SEO optimization, and some magic to make the
page load faster.
As a result, our site written in developer-friendly React is transformed into
browser-friendly oldschool HTML that is more widely supported and, in some
aspects, more efficient.

## Development

- `npm run develop` will build and serve the page at localhost:8000.
- `npm run format` will prettify source files
- `npm run type-check` will invoke a typescript compiler and check for type
  violations.
