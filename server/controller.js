const model = require('./model.js');

module.exports = {

  getAll: async function(req, res) {
    var changeSort;
    if (!req.query.sort || req.query.sort === 'relevant' ) {
      changeSort = {
        'helpful' : 'helpfulness',
        'date' : 'date'
      }
    } else if (req.query.sort === 'helpful') {
      changeSort = 'helpfulness'
      console.log("CHANGE HERE")
    } else if (req.query.sort === 'newest') {
      changeSort = 'date'
    }
    /**
     page = 1
     sort = 'relevant' 'helpful' 'newest'(date)
     count = 5
     product_id = NEED
     */
    var param = {
      'page' :  !req.query.page ? 1 : Number(req.query.page),
      'sort' : changeSort , //!req.query.sort ? 'relevant' : req.query.sort,
      'count' : !req.query.count ? 5 : Number(req.query.count),
      'product_id' : req.query.product_id
    }


    console.log(param)
    console.log(typeof param.sort === 'object')
    try {
      //invoke the model here
      const data = await model.getData(req, param)
      res.send(data)
    } catch (err) {
      //console.log or send the error here
      res.send(err)
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