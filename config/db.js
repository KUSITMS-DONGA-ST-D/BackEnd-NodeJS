require('dotenv').config();
const env = process.env;

dev = {
    host: env.DB_URL,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: 'DONGA_ST_D'
}
real = {
    host: env.DB_URL,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: 'DONGA_ST_D',
}

module.exports = { real, dev};