# Application Entry Point

The main method([source](../file/src/entry.js.html#lineNumber47)) is where we import the server class, and set up the routes to
be handled by our application. We also want to make ensure the application is closed down as calmly as
possible when the user asks, so we make sure to nicely ask our server to shut itself and then ask mariadb to
close any open connections.

I think we also added the handler([source](../file/src/entry.js.html#lineNumber83)) for `unhandledRejection`
exceptions so that we print the error to output before exiting (We may also want to log this to any
notification system)
