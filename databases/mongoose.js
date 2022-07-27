const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviews')


// /reviews/
const photoSchema = new mongoose.Schema({
  id: {type: Number, index: true},
  url: String
})

const Photo = mongoose.model('Photo', photoSchema) //note: when created in database Photo will turn into 'photos'


const resultsSchema = new mongoose.Schema({
  review_id: {type: Number, index: true},
  rating: Number,
  summary: String,
  body: String,
  recommend: Boolean,
  date: Date,
  reviewer_name: String,
  helpfulness: Number,
  photos: [photoSchema] //table is in line 6
})

const Result = mongoose.model('Result', resultsSchema)


const reviewSchema = new mongoose.Schema({
  product_id: {type: Number, index: true},
  page: Number,
  count: Number,
  results: [resultsSchema] //table is in line 14

})

const Review = mongoose.model('Review', reviewSchema)


// /reviews/meta
const reviewMetaSchema = new mongoose.Schema({
  id: {type: Number, index: true},
  recommended: {
    true: Number,
    false: Number
  },
  ratings: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number,
  },
  characteristics: {
    Fit: {
      id: {type: Number, index: true},
      value: Number,
    },
    Length: {
      id: {type: Number, index: true},
      value: Number,
    },
    Comfort: {
      id: {type: Number, index: true},
      value: Number,
    },
    Quality: {
      id: {type: Number, index: true},
      value: Number,
    },
  }

})

const ReviewMeta = mongoose.model('ReviewMeta', reviewMetaSchema)
