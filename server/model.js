const pool = require('../db')


module.exports = {
  getData: function (req, param) {
    return new Promise((resolve, reject) => {

      if (typeof param.sort === 'object') {
        pool.query((`  SELECT
                    reviews.review_id,
                    reviews.rating,
                    reviews.summary,
                    reviews.recommend,
                    reviews.response,
                    reviews.body,
                    reviews.date,
                    reviews.reviewer_name,
                    reviews.helpfulness,
                    json_agg( COALESCE ( json_build_object( 'id', photos.id,  'url', photos.url), '[]')) AS photos
                    FROM reviews
                    LEFT JOIN photos ON reviews.review_id = photos.reviews_id
                   WHERE reviews.product_id = ${param.product_id}
                   GROUP BY reviews.review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness
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
                    reviews.review_id,
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
                    LEFT JOIN photos ON reviews.review_id = photos.reviews_id
                   WHERE reviews.product_id = ${param.product_id}
                   GROUP BY reviews.review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness
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

  metaData: function (req) {
    console.log('meta in here now?')
    var storeQuery = {}
    storeQuery['product_id'] = req.query.product_id
    return new Promise((resolve, reject) => {
      pool.query((`SELECT
                  characteristics.id,
                  characteristics.name,
                  characteristics_review.value
                  FROM characteristics
                  LEFT JOIN characteristics_review
                  ON characteristics.id = characteristics_review.id
                  WHERE characteristics.product_id = ${req.query.product_id}`), (err, data1) => {
        if (err) {
          reject(err)
        } else {
          console.log("GET IN HERE?: ", data1.rows)
          var character = {}
          for (var item of data1.rows) {
            character[item.name] = { 'id': item.id, 'value': item.value }
          }
          storeQuery['characteristics'] = character //store the characteristics in here
          //SELECT count(*) FILTER (WHERE rank = ANY ('{a,b,v}')) AS myvalues
          pool.query((`SELECT COUNT(reviews.recommend) FILTER (WHERE reviews.recommend = true AND reviews.product_id = ${req.query.product_id}) AS trueL,
                       COUNT(reviews.recommend) FILTER (WHERE reviews.recommend = false AND reviews.product_id = ${req.query.product_id}) AS falseL
                       FROM reviews`), (err, data2) => {
            if (err) {
              reject(err)
            } else {
              storeQuery['recommended'] = data2.rows
              pool.query((`SELECT rating FROM reviews WHERE product_id = ${req.query.product_id}`), (err, data3) => {
                if (err) {
                  reject(err)
                } else {
                  console.log("data3: ", data3.rows)
                  var rating = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
                  for (item of data3.rows) {
                    rating[item.rating]++
                  }
                  storeQuery['rating'] = rating
                  resolve(storeQuery)

                }
              })
            }
          })
        }
      })
    })
  },

  postDate: function(req) {
    var date = new Date().toISOString();
    console.log("SHOW ME DATA: ", req)
    return new Promise((resolve, reject) => {
      pool.query((`INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
                   VALUES('${req.product_id}', '${req.rating}', '${date}', '${req.summary}', '${req.body}', '${req.recommend}', false, '${req.name}', '${req.email}', 0)
                  `), (err) => {
        if (err) {
          reject(err)
        } else {
          console.log("posted")
          resolve('posted')
        }
      })

    })
  },

  addHelpful: function(req) {

    return new Promise((resolve, reject) => {
      pool.query((`UPDATE reviews SET helpfulness = helpfulness + 1
                  WHERE review_id = ${req}`), (err) => {
        if (err) {
          reject(err)
        } else {
          console.log("COME IN HERE?")
          resolve('added')
        }
      })
    })
  },






//replace(___ 'null', '[]')

}






// ),
// test2 AS (
//   INSERT INTO photos VALUES(reviews_id, url)
//   VALUES (SELECT review_id FROM reviews WHERE product_id = ${req.product_id}, re )
// )
// INSERT INTO
// '${req.product_id}', '${req.rating}', '${date}', '${req.summary}', '${req.body}', '${req.recommend}', false, '${req.name}', '${req.email}', 0)