const pool = require('../db')


module.exports = {
  getData: function (req) {
    return new Promise((resolve, reject) => {
      pool.query(('SELECT * FROM characteristics WHERE product_id = 1'), (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }

      })
    })

  },


}