const express = require('express');
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router.js')

//Middleware
app.use(express.json())
app.use(cors())

//Tranfer to router file
app.use('' , router);

//loader io
app.get(`/${process.env.LOADER_IO_KEY}`, (req, res) => {res.status(200).send(process.env.LOADER_IO_KEY)});



let port = 3100
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})