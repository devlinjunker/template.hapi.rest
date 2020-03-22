# Logging

We are currently using pino for logging. Pino logs objects/messages directly to streams so other processes can
actually handle formatting or other log actions (this is because Node is single threaded, so smarter to create
another process to manage the logs). We store all of these files in `<CONFIG.LOG.dir>/pino.log`

## Configurations

Some settings can be configured in the config.yaml([github](https://github.com/devlinjunker/template.node.hapi/blob/master/conf/config.yaml#L12)) file:
  - The `debug` property shows error messages and stack traces in the stdout of the server process (for
     development)
  - The `dir` property defines the directory to save log files in
  - The `level` property defines the log level we show in pino.log

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


## Other processes
Other node processes should be spawned (in production and development), here are some examples of processes
we recommend:

### Logrotate
By design, pino just outputs logs to be used by other "transporters". Log Rotation should be handled via
another service as described in the [pino documention](http://getpino.io/#/docs/help?id=log-rotation)

### Pino-Pretty
Displays the logs in a prettier format that makes it easier to see the data, however takes up more space.
To use, pipe the log file to pino-pretty executable:
`tail -f logs/pino.log | ./node_modules/.bin/pino-pretty -t `  

See [CLI arguments](https://github.com/pinojs/pino-pretty#cli-arguments) for more control of output:
  - remove `-t` for epoch
  - `-s` for searching
  - `-i` for ignoring properties
e.g.
```
[2020-03-22 05:58:27.175 +0000] INFO  (72753 on Devlins-MacBook-Air.local): request completed
    req: {
      "id": "1584855457513:Devlins-MacBook-Air.local:72753:k82m08u1:10001",
      "method": "put",
      "url": "http://localhost:3333/api/note/1",
      "headers": {
        "host": "localhost:3333",
        "connection": "keep-alive",
        "content-length": "17",
        "accept": "*/*",
        "sec-fetch-dest": "empty",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
        "content-type": "application/json",
        "origin": "http://localhost:3333",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "cors",
        "referer": "http://localhost:3333/docs/swagger/index.html",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
        "cookie": "SQLiteManager_currentLangue=2; _pk_id.2.1fff=e04c4083531e55a4.1584819760.6.1584855171.1584855171.; _pk_ses.2.1fff=1"
      },
      "remoteAddress": "127.0.0.1",
      "remotePort": 64175
    }
    res: {
      "statusCode": 200,
      "headers": {
        "content-type": "application/json; charset=utf-8",
        "vary": "origin",
        "access-control-allow-origin": "http://localhost:3333",
        "access-control-expose-headers": "WWW-Authenticate,Server-Authorization",
        "cache-control": "no-cache",
        "content-length": 4
      }
    }
    responseTime: 6
```


## Notes/Ideas
- Log Helper for use in the dataservices
- goaccess?
- websocket? endpoint that shows logs in real time
- docs page for logs (searching?)
- Elasticsearch/Logstash/Kibana
