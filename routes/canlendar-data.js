const express = require('express');
const router = express.Router();
const conn = require('../config/db.js');
const mysql = require('mysql2/promise');



router.get('/', async (req, res, next) => {    
    const connection = await mysql.createConnection(conn.real); // DB 커넥션 생성
    await connection.connect();         
    try {  
        const get_user = req.body.username;
        const user_sign = `select * from USERS where username = '${String(get_user)}'; `
        const result = await connection.query(user_sign);

   
        
        const new_user = `INSERT INTO USERS(username, correct_cnt) VALUES ('${String(get_user)}', 0); `
        await connection.query(new_user);
      
        return res.status(202).json({
            code: 202,
            message: "username enroll"
        });
        
        
    } catch (error) {
        res.status(500).json({
        "code":500,
        "message": "server error"
        });
    }finally{
       connection.end();  
    }

});



module.exports = router;