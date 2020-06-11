var pool = require('./databaseConfig.js');

var furnitureDB = {
    getFurniture: function (callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected!");
                var sql = 'SELECT * FROM tb_furniture';
                conn.query(sql, function (err, result) {
                    conn.release();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    },
    /* end function get all furniture */

    getFurnitureByCat: function (catid, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM tb_furniture where cat_id = ?';
                conn.query(sql, [catid], function (err, result) {
                    conn.release();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    }
    /* end function get furniture by ID */
};
module.exports = furnitureDB