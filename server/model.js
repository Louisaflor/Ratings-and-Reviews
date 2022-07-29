const pool = require('../db')


module.exports = {
  getData: function (req) {
    console.log('im in here: ', req.query.count)
    return new Promise((resolve, reject) => {

      pool.query((`SELECT
                    reviews.id,
                    reviews.rating,
                    reviews.summary,
                    reviews.recommend,
                    reviews.response,
                    reviews.body,
                    reviews.date,
                    reviews.reviewer_name,
                    reviews.helpfulness,
                    COALESCE ( json_agg( json_build_object( 'id', photos.id,  'url', photos.url)), '0' ) AS photos
                    FROM reviews
                    LEFT JOIN photos ON reviews.id = photos.reviews_id
                   WHERE reviews.product_id = 2
                   GROUP BY reviews.id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness
                   limit ${req.query.count}`), (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            'product': req.query.product_id,
            'page' : req.query.page,
            'count': req.query.count,
            'results': data.rows
          }
            )
        }

      })
    })

  },


}

//  json_agg (
//   json_build_object(
//     'id', p.id,
//     'url', p.url
//     )
//   )
//    AS photos
// FROM reviews r
// LEFT JOIN photos p
// ON r.id = p.reviews_id

// COALESCE (
//   json_agg (
//     json_build_object (
//       'id', p.id,
//       'url', p.url
//     )
//   ),
// '[]') AS photoss