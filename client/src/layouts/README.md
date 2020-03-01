# Layouts

Components defining the structure of nodes.
Responsible for rendering key parts that should always appear in the same
position, e.g. navbars, notifications, menus, etc.

## Where to use

Most pages should use a layout.
A single layout will be reused across the majority of app.
A subset of pages cannot use the main layout (e.g. the auth forms, landing
page) - their structure should also be extracted into a layout component.

It might be worth extracting common form structure to a layout component.
