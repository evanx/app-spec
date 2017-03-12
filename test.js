
const appSpec = require('./index.js');

const context = appSpec(
    require('./package.json'),
    pkg => ({
        description: pkg.description,
        env: {
            field: {
                description: 'the field name for hashes',
                requiredEnv: env => ['hget'].includes(env.command)
            },
            command: {
                description: 'the command to perform',
                options: ['del', 'hkeys', 'hgetall', 'llen', 'hget', 'ttl', 'type', 'expire', 'persist'],
                default: 'none'
            },
        }
    }),
    {
        NODE_ENV: 'development',
        command: 'hget',
        field: 'some'
    }
);

console.log({context});
