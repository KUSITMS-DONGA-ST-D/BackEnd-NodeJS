const express = require('express');
const router = express.Router();
const conn = require('../config/db.js');
const mysql = require('mysql2/promise');


router.get('/', async (req, res, next) => {
    const connection = await mysql.createConnection(conn.real); // DB 커넥션 생성
    await connection.connect();
    try {
        const { start_day, end_day, age, gender, category } = req.body;

        console.log(String(category));
        console.log(start_day);
        console.log(end_day);
        console.log(gender);
      

        const contents_data = `select * from contents where (created_date between '${start_day}' and '${end_day}') and (content_category = "${category}"); `;
        
        
        const result = await connection.query(contents_data);

        console.log(result[0]);

        const re = result[0].map((el)=> el.content_id);
        console.log(re);


        // const new_user = `INSERT INTO USERS(username, correct_cnt) VALUES ('${String(get_user)}', 0); `
        // await connection.query(new_user);

        return res.status(202).json(
            result[0]
        );


    } catch (error) {
        res.status(500).json({
            "code": 500,
            "message": "server error"
        });
    } finally {
        connection.end();
    }

});



module.exports = router;