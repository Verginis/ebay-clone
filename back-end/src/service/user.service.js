const dbConn = require("../../config/db.config");

module.exports = {
    getUsers: callback => {
        dbConn.query(
            'select * from user',
            [],
            (err, results, fields) => {
                if(err) {
                    callback(err);
                }

                return callback(null, results);
            }
        );
    }, 
    getUserById: (id, callback) => {
        dbConn.query(
            `select * from user where id = ?`,
            [id],
            (error, results, fields) => {
              if (error) {
                callback(error);
              }
              return callback(null, results[0]);
            }
        );
    }
};