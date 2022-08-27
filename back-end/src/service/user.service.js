// // const dbConn = require("../../config/db.config");
// const sequelize = require('../../config/db.config');

// module.exports = {
//     getUsers:  () => {
//        return new Promise((resolve, reject) => {
//         dbConn.query( 'select * from user',
//             [],
//             (err, results) => {
//                 if(err) {
//                     return reject(err);
//                 }
//                 return resolve(results);
//             });
//        });
//     }, 
//     // getUserById: (id) => {
//     //     return new Promise((resolve, reject) => {
//     //         dbConn.query( `select * from user where id = ?`,
//     //             [id],
//     //             (error, results) => {
//     //               if (error) {
//     //                 return reject(err);
//     //               }
//     //                 return resolve(results);
//     //             });
//     //     });
//     // },
//     // createUser: (data) => {
//     //     return new Promise((resolve, reject) => {
//     //         dbConn.query(`insert into user(firstname,lastname,email,password,phoneNumber,country,afm) 
//     //                                     values(?,?,?,?,?,?,?)`,
//     //         [data.firstname,data.lastname,data.email,data.password,data.phoneNumber,data.country,data.afm],
//     //         (error, results)=> {
//     //             if(error) {
//     //                 return reject(error);
//     //             } 
//     //             console.log('perase');
//     //                 return resolve(results);
//     //         });
//     //     });
//     // } 
// };

