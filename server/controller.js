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
    } catch (err) {
      res.send(metaData)
    }
  },

  post: async function(req, res) {
    console.log("GOT IN POST: ", req.body)
    try {
      const data = await model.postReviews(req.body)
      console.log("DATA: ", data.rows[0].review_id)
      return Promise.all(req.body.photos.map((photo) => {model.postPhotos(data.rows[0].review_id, photo)}))
      .then((result) => {
        console.log("GOT THE PHOTO RESULTS: ", result)
        // res.send(results)test
      })
      .catch((err) => {
        console.log("error when posting photos: ", err)
        res.send(err)
      })
      res.send(data)

    } catch (err) {
     res.send(err)
    }


  },

  helpful: async function(req, res) {
    console.log("GIVE ME PARAM: ",req.params.review_id)

    try {
      const data = await model.addHelpful(req.params.review_id)
      res.sendStatus(201)
    } catch (err) {
      res.send(err)
    }

  },

  report: function() {

  },

  report: async function(req, res) {

    try {
      const data = await model.reportData(req.params.review_id)
      res.sendStatus(201)
    } catch (err) {
      res.send(err)
    }
  }



}