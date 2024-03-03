import dotenv from 'dotenv';
dotenv.config();

import pkg from  'pg';

const {Pool}  = pkg;

export const pool = new Pool({

    user : process.env.DB_USER,
    host : process.env.DB_HOST ,
    database : process.env.DB_NAME,
    password : process.env.DB_PASS,
    port : 5432,
    idleTimeoutMillis : 20000,
    max : 12
});
