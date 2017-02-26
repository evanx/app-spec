
const assert = require('assert');
const lodash = require('lodash');
const clc = require('cli-color');

const mapMetas = metas => Object.keys(metas).map(key => {
    const meta = metas[key];
    meta.key = key;
    if (meta.default !== undefined) {
        if (meta.options && !lodash.includes(meta.options, meta.default)) {
            meta.options = [meta.default, ...meta.options];
        }
        if (meta.type === undefined) {
            if (Number.isInteger(meta.default)) {
                meta.type = 'integer';
            }
            if (meta.example === undefined) {
                meta.example = meta.default;
            }
        }
    }
    return meta;
});

const reduceMetas = (metas, params, defaults) => metas.reduce((props, meta) => {
    const key = meta.key;
    if (params[key]) {
        const value = params[key];
        if (!value.length) {
            throw new Error(`Property '${key}' is empty'`);
        }
        const parsedValue = (meta.type === 'integer')
        ? parseInt(value)
        : (meta.elementType === 'string')
        ? value.split(',')
        : value
        ;
        if (meta.options && !lodash.includes(meta.options, parsedValue)) {
            throw new Error(`Invalid '${key}'`);
        }
        props[key] = parsedValue;
    } else if (props[key]) {
    } else if (meta.default !== undefined) {
        props[key] = meta.default;
    } else {
        const meta = metas[key];
        if (meta.required !== false) {
            throw new Error(`Missing required '${key}'`);
        }
    }
    return props;
}, defaults || {});

const formatMeta = meta => {
    let lines = [lodash.capitalize(meta.description.slice(0, 1)) + meta.description.slice(1)];
    if (meta.options) {
        lines.push(`Options: ${meta.options.join(', ')}`);
    }
    if (meta.hint) {
        lines.push(`Hint: ${meta.hint}`);
    }
    if (meta.note) {
        lines.push(clc.white(`Note: ${meta.note}`));
    }
    if (false && meta.type) {
        lines.push(`type: ${meta.type}`);
    }
    return [
        (meta.example === undefined)
        ? `${clc.bold(meta.key)}`
        : (meta.type === 'integer' || !/\s/.test(meta.example))
        ? `${clc.bold(meta.key)}=${meta.example}`
        : `${clc.bold(meta.key)}='${meta.example}'`
        ,
        ...lines.map(line => `  ${line}`)
    ];
};

const formatMetas = metas => Object.keys(metas).map(
    key => metas[key]
).map(
    formatMeta
).map(
    lines => lines.map(line => `  ${clc.cyan(line)}`).join('\n')
);

module.exports = (pkg, specf, params, options = {}) => {
    const spec = specf(pkg);
    assert(process.env.NODE_ENV, 'NODE_ENV');
    assert(spec.env, 'spec.env');
    const formatSpec = (description, heading, metas) => [
        clc.green.bold(description),
        clc.white.bold(heading),
        ...formatMetas(metas)
    ].join('\n');
    spec.env = mapMetas(spec.env);
    spec.defaults = spec.defaults || {};
    if (process.env.mode !== 'quiet') {
        console.error(formatSpec(spec.description, 'Environment:', spec.env));
    }
    const env = reduceMetas(spec.env, process.env, spec.defaults[process.env.NODE_ENV]);
    if (!spec.config) {
        return env;
    }
    assert(typeof spec.config === 'function', 'spec.config function of env');
    const configMetas = mapMetas(spec.config(env));
    return reduceMetas(configMetas, process.env, env);
};
