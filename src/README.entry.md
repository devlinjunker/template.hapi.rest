# Application Entry Point

The main method([github](https://github.com/devlinjunker/template.hapi.rest/blob/master/src/entry.js.html#L47))
is where we instantiate the server wrapper class, and set up the routes to be handled by our application. We
also want to make ensure the application is closed down as calmly as possible when the user asks, so we make
sure to nicely ask our server to shut itself down and then ask mariadb to close any open
connections([github](https://github.com/devlinjunker/template.hapi.rest/blob/master/src/entry.js.html#L71)).

I think we also added the handler for `unhandledRejection`
exceptions([github](https://github.com/devlinjunker/template.hapi.rest/blob/master/src/entry.js.html#L83))
so that we print the error to output before exiting (We may also want to log this to any notification system)


## Notes/Ideas

- **IDEA:** Generic Handler/Middleware that creates Request Details Object to pass to each controller
