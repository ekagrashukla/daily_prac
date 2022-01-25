const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password:'hrhk',
    database:'dev_dump',
    port:'5432'
})

module.exports = pool;