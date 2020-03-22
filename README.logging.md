# Logging

We are currently using pino for logging. Pino logs objects/messages directly to streams so other processes can
actually handle formatting or other log actions (this is because Node is single threaded, so smarter to create
another process to manage the logs). We store all of these files in `<CONFIG.LOG.dir>/pino.log`

**TODO:**
- pino-pretty
- goaccess?
- websocket? endpoint that shows logs in real time
- docs page for logs (searching?)
- Elasticsearch/Logstash/Kibana

## Configurations

Some settings can be configured in the config.yaml file:
  - The `debug` property shows error messages and stack traces in the stdout of the server process (for
     development)
  - The `dir` property defines the directory to save log files in
  - The `level` property defines the log level we show in pino.log

Log Rotation on production should be handled via another service as described in
[pino documention](http://getpino.io/#/docs/help?id=log-rotation) (e.g. logrotate).

## What we log

- Request Log
  - We record all connections to endpoints with the request details
- Errors
  - Any Errors during request execution will be recorded in the log
- Developer Messages (via Logger provided methods in Route Controllers)
  - Messages added by developers inside the controller body
  - different methods for levels: trace/debug/info/warn/error/fatal

**Example:**  
```
controller({ params, logger }: HapiRequest) {
  try {
      logger.info({ data: params });

      ...do stuff...
  } catch(err) {
    logger.error('Personalized Error Message');
  }

  ... return things?...
}
```
