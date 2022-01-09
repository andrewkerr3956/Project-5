import host from './confidential';
import database from './confidential';
import port from './confidential';
import username from './confidential';
import password from './confidential';

module.exports = {
  env: {
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_DB: process.env.MYSQL_DB,
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_USERNAME: process.env.MYSQL_USERNAME,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD 
  },
  reactStrictMode: true,
}
