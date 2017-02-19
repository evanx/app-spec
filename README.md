# app-spec

Get application configuration from spec of required environment variables.

## Usage

We define environment dependencies and defaults via a `spec` file:
```javascript
module.exports = {
    description: 'Redis-based caching proxy for Google Maps API queries.',
    required: {
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
require('redis-koa-app-rpf')(require('./spec'), require('./main'));
```        

The application archetype uses this library to parse the `config` from `process.env` according to the `spec` and to invoke the `main` function.

## Used by

- https://github.com/evanx/redis-app-rpf
- https://github.com/evanx/redis-koa-app-rpf

<hr>

https://twitter.com/@evanxsummers
