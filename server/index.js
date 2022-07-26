const express = require('express');
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const route = require('./router.js')

//Middleware
app.use(express.json())




let port = 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})