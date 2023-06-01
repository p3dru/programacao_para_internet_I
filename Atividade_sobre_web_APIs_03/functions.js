const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: '',
    user: 'postgres',
    password: '',
});

async function selectAll(){
    try{
        const client = await pool.connect();
        const result = await client.query('select * from postagem');
        client.release();
        return result.rows;
    } catch (err){
        console.error('Erro na pesquisa: ', err);
        throw err;
    }
}

module.exports = { selectAll };