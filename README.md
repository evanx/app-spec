# app-spec

Get application configuration from spec of required environment variables.

## Usage

We define environment dependencies and defaults via a `spec` file:
```javascript
module.exports = pkg => ({
    env: {
        redisHost: {
            description: 'the Redis host',
            default: 'localhost'
        },
        redisPort: {
            description: 'the Redis port',
            default: 6379
        }
    }
}
```

The application `index.js` passes the `spec` definition and `main` (entry-point) function to the application archetype.
```javascript
require('redis-koa-app')(
    require('../package'),
    require('./spec'),
    async deps => Object.assign(global, deps),    
    () => require('./main')
).catch(console.error);
```        

The application archetype uses this library to parse the `config` from `process.env` according to the `spec` and to invoke the `main` function.

In the above example, we assign the archetype's dependencies on `global` before `main.js` is parsed i.e. including:
```javascript
    const deps = {
        assert, clc, lodash, Promise,
        asserta, asserto,
        DataError, StatusError,
        redis, client, logger, config,
        multiExecAsync
    };
```

## Used by

- https://github.com/evanx/redis-app
- https://github.com/evanx/redis-koa-app

<hr>

https://twitter.com/@evanxsummers
