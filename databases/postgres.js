const { Pool, Client } = require("pg");

//make our connection with posgreSQL

const pool = new Pool({
  user: 'postgresuser',
  host: 'localhost',
  database: 'postgres_louisa',
  password: '',
  port: 3100,
})

//congifure the user,host, and other properties
pool.on('error', (err, client) => {
  console.log('Error: ', err)
});

pool.connect()

module.exports.pool = pool; // pass the connection to the model file

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err,res)
//   pool.end()
// })

// const client = new Client({
//   host: 'localhost',
//   user: 'dbuser',
//   database: 'postgreSQL-louisa',
//   password: '',
//   port: 3000
// })

// client.connect()