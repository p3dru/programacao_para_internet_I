const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: '',
    user: 'postgres',
    password: '',
})

pool.connect()
    .then(() => {
        console.log('Conexão feita')
    })
    .catch((err) => {
        console.error('Erro', err);
    })
