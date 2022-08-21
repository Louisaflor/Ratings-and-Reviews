const pool = require("../db");

module.exports = {
  getData: function (req, param) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT
                    reviews.review_id,
                    reviews.rating,
                    reviews.summary,
                    reviews.recommend,
                    reviews.response,
                    reviews.body,
                    reviews.date,
                    reviews.reviewer_name,
                    reviews.helpfulness,
                    (SELECT
                      COALESCE(json_agg(row_to_json(photos)), '[]' :: json) photos
                      FROM (
                        SELECT id, url FROM photos WHERE photos.reviews_id = reviews.review_id
                      ) photos
                    )
                    FROM reviews
                    LEFT JOIN photos ON reviews.review_id = photos.reviews_id
                   WHERE reviews.product_id = ${param.product_id} AND reviews.reported = false
                   GROUP BY reviews.review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness
                   ORDER BY reviews.${param.sort}
                   limit ${param.count}`,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              product: param.product_id,
              page: param.page,
              count: param.count,
              results: data.rows,
            });
          }
        }
      );
    });
  },

  metaData: function (req) {
    // console.log('meta in here now?')
    var storeQuery = {};
    var product = { product_id: req.query.product_id };
    // storeQuery['product_id'] = req.query.product_id
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT

       (SELECT
      json_object_agg(name , json_build_object('id', id , 'value', value)) as characteristics
      FROM (
      SELECT characteristics.name AS name, characteristics.id AS id, AVG(characteristics_review.value) AS value
      FROM characteristics_review
      INNER JOIN characteristics
      ON characteristics.id = characteristics_review.characteristic_id
      WHERE characteristics.product_id = ${req.query.product_id}
      GROUP BY characteristics.id
      ) AS id_and_value),

      (SELECT
        json_object_agg(recommend, count) as recommended
         FROM (
         SELECT recommend, COUNT(recommend) AS count
          FROM reviews
          WHERE product_id = ${req.query.product_id}
          GROUP BY recommend
          ) recommended
      ),

      (SELECT
        json_object_agg(rating, count) as ratings
        FROM (
          SELECT rating, COUNT(rating) AS count
          FROM reviews
          WHERE product_id = ${req.query.product_id}
          GROUP BY rating
        ) ratings
      )

      `,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            storeQuery = {
              ...product,
              ...data.rows[0],
            };
            // console.log("WHAT WILL THIS STORE LOOK LIKE: ", storeQuery)
            resolve(storeQuery);
          }
        }
      );
    });
  },

  postReviews: function (req) {
    // console.log("IN HERE")
    var date = new Date().toISOString();
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO reviews (review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness)
      VALUES((SELECT setval ('"reviews_review_id_seq"', (SELECT MAX(review_id) FROM reviews)+1)), ${req.product_id}, ${req.rating}, '${date}', '${req.summary}', '${req.body}', ${req.recommend}, false, '${req.name}', '${req.email}', 0) returning *
                  `,
        (err, data) => {
          if (err) {
            // console.log("ERROR WHEN POSTING DATA: ", err)
            reject(err);
          } else {
            // console.log("GOT IN HERE TOO: ")
            resolve(data);
          }
        }
      );
    });
  },

  postPhotos: function (id, photo) {
    return pool.query(`INSERT INTO photos (id, reviews_id, url)
                      VALUES ((SELECT setval ('"photos_id_seq"', (SELECT MAX(id) FROM photos)+1)), ${id}, '${photo}')
                      returning *`);
  },

  postCharacters: function (review_id, char_id, value) {
    // console.log("WE GOT IN CHARACTERS: ", review_id, char_id, value)
    return pool.query(`INSERT INTO characteristics_review (id, characteristic_id, review_id, value)
                      VALUES ((SELECT setval ('"characteristics_review_id_seq"', (SELECT MAX(id) FROM characteristics_review)+1)), ${char_id}, ${review_id}, '${value}')
                      returning *`);
  },

  addHelpful: function (req) {
    // console.log("DID IT COME?")
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE reviews SET helpfulness = helpfulness + 1
                  WHERE review_id = ${req}`,
        (err) => {
          if (err) {
            reject(err);
          } else {
            // console.log("COME IN HERE?")
            resolve("added");
          }
        }
      );
    });
  },

  reportData: function (req) {
    // console.log("DID IT COME?")
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE reviews SET reported = true
                  WHERE review_id = ${req}`,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve("added");
          }
        }
      );
    });
  },
};
