// import { MY_SQL_CONFIG } from './config.env'

// const Sequelize = require("sequelize");

// console.log(process.env.DB, process.env.USER, process.env.PASSWORD)
// const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
//   host: process.env.HOST,
//   dialect: process.env.dialect
// });
// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
// module.exports = db;

// console.log(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD)
// const mysql = require('mysql2');
// const db = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   database: process.env.MYSQL_DB,
//   password: process.env.MYSQL_PASSWORD
// });

// db.connect((err) => {
//     if (err){
//       throw err;
//     } 
//     console.log('Connected!');
//   });
  
//   module.exports = db;

import mysql from 'serverless-mysql'

// console.log(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD);

export const db = mysql({
    config: {
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
  })

// console.log( mysql_db.connect );
export async function sql_query(query_string, values = []){
    try{
        const results = await db.query(query_string, values)
        await db.end()
        return results
    } catch (e){
        throw Error(e.message);
    }
}
