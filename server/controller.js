const model = require('./model.js');

module.exports = {

  getAll: async function(req, res) {
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