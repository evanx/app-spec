
const appSpec = require('./index.js');
console.log(appSpec(require('./test/geo-cache'), process.env));
console.log(appSpec(require('./test/reo/spec'), process.env));
