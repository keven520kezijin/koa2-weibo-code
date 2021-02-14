const { isProd } = require('../utils/env')


/**
 * @description 存储配置
 * @author 柯文
 */
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

const MYSQL_CONF = {
  // 线上的mysql配置
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'koa2_weibo_db'
}

if (isProd) {
  REDIS_CONF = {
    // 线上的redis配置
    port: 6379,
    host: '127.0.0.1'
  }

  MYSQL_CONF = {
    // 线上的mysql配置
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'koa2_weibo_db'
  }
}

// if (isProd) {
//   console.log('isProd')
//   REDIS_CONF = {
//       // 线上的 redis 配置
//       port: 6379,
//       host: '127.0.0.1'
//   }

//   MYSQL_CONF = {
//       // 线上的 mysql 配置
//       host: 'localhost',
//       user: 'root',
//       password: 'root',
//       port: '3306',
//       database: 'koa2_weibo_db'
//   }
  
// }

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}


