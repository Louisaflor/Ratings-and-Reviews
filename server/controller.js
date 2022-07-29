const model = require('./model.js');

module.exports = {

  getAll: async function(req, res) {
    /**
     page
     sort
     count
     product_id
     */
    console.log(req.query.page, req.query.sort, req.query.count, req.query.product_id)
    try {
      //invoke the model here
      const data = await model.getData(req)
      res.send(data)
    } catch (err) {
      //console.log or send the error here
      console.log("ERROR", err)
    }

  },

  getMeta: function() {

  },

  post: function() {


  },

  helpful: function() {

  },

  report: function() {

  },



}