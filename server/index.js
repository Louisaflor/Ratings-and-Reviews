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



let port = 3100
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})