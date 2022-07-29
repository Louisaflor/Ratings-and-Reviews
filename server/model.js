const pool = require('../db')


module.exports = {
  getData: function (req, param) {
    return new Promise((resolve, reject) => {

      if (typeof param.sort === 'object') {
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
                   WHERE reviews.product_id = ${param.product_id}
                   GROUP BY reviews.id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness
                   ORDER BY reviews.${param.sort.helpful} DESC, reviews.${param.sort.date} DESC
                   limit ${param.count}`), (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve({
              'product': param.product_id,
              'page': param.page,
              'count': param.count,
              'results': data.rows
            }
            )
          }

        })
      } else {
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
                   WHERE reviews.product_id = ${param.product_id}
                   GROUP BY reviews.id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness
                   ORDER BY reviews.${param.sort} DESC
                   limit ${param.count}`), (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve({
              'product': param.product_id,
              'page': param.page,
              'count': param.count,
              'results': data.rows
            }
            )
          }

        })

      }



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