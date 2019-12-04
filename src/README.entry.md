# Application Entry Point

The main method([source](../file/src/entry.js.html#lineNumber47)) is where we instantiate the server wrapper
class, and set up the routes to be handled by our application. We also want to make ensure the application is
closed down as calmly as possible when the user asks, so we make sure to nicely ask our server to shut itself
down and then ask mariadb to close any open connections([source](../file/src/entry.js.html#lineNumber71)).

I think we also added the handler for `unhandledRejection` exceptions([source](../file/src/entry.js.html#lineNumber83))
so that we print the error to output before exiting (We may also want to log this to any notification system)


## Notes/Ideas

- **IDEA:** Generic Handler/Middleware that creates Request Details Object to pass to each controller
