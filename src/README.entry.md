# Application Entry Point



The Entry file [github](https://github.com/devlinjunker/template.hapi.rest/blob/master/src/entry.js) contains a main method which is where we instantiate the server wrapper class and set the endpoints to be handled by our application. The routes and controllers(handler functions) are imported from each file in the `controllers` directory.  We also set up the admin and docs endpoints (configurable in `conf` directory).

We catch any errors that occur during this server setup so that we can print a helpful error message. We also want to make ensure the application is closed down as gracefully as possible when the user asks, so we make sure to watch for any OS signals from the user and then nicely ask our server to shut itself down, then ask mariadb to close any remaining open connections.

I think we also added the handler for `unhandledRejection` exception handlers at the end of the file, so that we print the error to output before exiting the program (We may also want to log this to any notification system?)


## Notes/Ideas

- **IDEA:** Generic Handler/Middleware that creates Request Details Object to pass to each controller
