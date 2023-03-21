const express = require('express');
const router = express.Router();
const conn = require('../config/db.js');
const mysql = require('mysql2/promise');



router.get('/', async (req, res, next) => {
    const connection = await mysql.createConnection(conn.real); // DB 커넥션 생성
    await connection.connect();
    try {
        const date = req.body.date;
        
        if(date === null){
            return res.status(404).json({
              message:"not found"
            });
        }
      

        const memo_data = `select memo_content from memo where created_date = "${date}"; `;
        const memo_result = await connection.query(memo_data);
        const memo_maping = memo_result[0].map((el) => el.memo_content);

        return res.status(200).json({
            date: date,
            content: memo_maping,
        });
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