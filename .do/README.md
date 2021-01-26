digitalocean.com/docs/app-platform/concepts/app-spec/

Digital Ocean app specification.
Can be used to automate digital ocean deployments with
[doctl](https://www.digitalocean.com/docs/apis-clis/doctl/).

## Note about multiple apps

Each .yaml file defines a separate Digital Ocean App.
For simplicity, it's easier to define landing as a separate app, rather than
a component of the main app. Hosting two static sites on the same domain would
require some extra configuration.

## Deployment

To create a new App from landing.yaml spec file, run

```
doctl apps create --spec ./.do/landing.yaml
```

To update an existing App:

1. Get the app id with `doctl apps list`.
2. Run `doctl apps update <app_id> --spec ./.do/landing.yaml`.

All steps above require correct
[doctl setup](digitalocean.com/docs/apis-clis/doctl/how-to/install/)
