const model = require('./model.js');

module.exports = {

  getAll: async function(req, res) {
    var param = {
      'page' :  !req.query.page ? 1 : Number(req.query.page),
      'sort' : null , //!req.query.sort ? 'relevant' : req.query.sort,
      'count' : !req.query.count ? 5 : Number(req.query.count),
      'product_id' : req.query.product_id
    }
    var changeSort;
    if (!req.query.sort || req.query.sort === 'relevant' ) {
      param.sort = 'helpfulness DESC, reviews.date DESC'
    } else if (req.query.sort === 'helpful') {
      param.sort = 'helpfulness DESC'
    } else if (req.query.sort === 'newest') {
      param.sort = 'date DESC'
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

  getMeta: async function(req, res) {

    try {
      const metaData = await model.metaData(req)
      // console.log("WHAT IS THIS GOING TO BE: ", metaData)
      // console.log('test:  ',character)
      res.send(metaData)
    } catch {
      res.send(metaData)
    }
  },

  post: async function(req, res) {
    console.log("GOT IN POST")
    try {
      const data = await model.postDate(req.body)
      console.log('data :', data)
      res.send(data)

    } catch {
      res.send(data)
    }


  },

  helpful: async function(req, res) {
    console.log("GIVE ME PARAM: ",req.params.review_id)

    try {
      const data = await model.addHelpful(req.params.review_id)
      res.sendStatus(201)
    } catch {
      res.send(data)
    }

  },

  report: function() {

  },

  report: async function(req, res) {

    try {
      const data = await model.reportData(req.params.review_id)
      res.sendStatus(201)
    } catch {
      res.send()
    }
  }



}