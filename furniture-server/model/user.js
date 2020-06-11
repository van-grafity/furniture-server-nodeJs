var pool = require('./databaseConfig.js');

var userDB = {
    getUsers: function (callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected!");
                var sql = 'SELECT * FROM user';
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
    /* end function get all user */

    addUser: function (useremail, userpassword, name, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null)
            } else {
                console.log("Connected!");
                var sql = 'INSERT INTO user (useremail, userpassword, name) values (?,?,?)';
                conn.query(sql, [useremail, userpassword, name], function (err, result) {
                    conn.release();

                    if (err) {
                        console.log(err);
                        return callback(err, null)
                    } else {
                        console.log(result);
                        return callback(null, result)
                    }
                })
            }
        })
    },
    /* end function add user */

    deleteUser: function (userid, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null)
            } else {
                console.log("Connected!")
                var sql = 'DELETE FROM user WHERE userid=?';
                conn.query(sql, [userid], function (err, result) {
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
    /* end function delete user */

    updateUser: function(useremail, userpassword, name, userid, callback){
        pool.getConnection(function(err, conn){
            if(err){
                console.log(err);
                return callback(err, null);
            }else{
                console.log('Connected!');
                console.log(userid+","+useremail+","+userpassword+ ","+name);
                var sql = 'UPDATE user SET useremail=?, userpassword=?, name=? WHERE userid=?';
                conn.query(sql, [useremail, userpassword, name, userid], function(err, result){
                    conn.release();
                    if(err){
                        console.log(err);
                        return callback(err, null);
                    }else{
                        console.log(result);
                        return callback(null, result);
                    }
                })
            }
        })
    }
    /* end function update user */
};
module.exports = userDB