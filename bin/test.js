
console.log(require('../index')({
    name: 'test_name',
    description: 'Test description'
}, pkg => ({
    env: {
        host: {
            description: 'the Redis host',
            default: 'localhost'
        },
        namespace: {
            description: 'the Redis namespace',
            default: pkg.name
        },
        loggerLevel: {
            description: 'the logger level',
            default1: 'info',
            defaults: {
                development: 'verbose'
            }
        }
    },
    config: env => ({
        inq: {
            description: 'the input queue name',
            default: `${env.namespace}:in:q`
        }
    }),
    defaults: {
        development: {
            loggerLevel1: 'debug'
        }
    }
})));
