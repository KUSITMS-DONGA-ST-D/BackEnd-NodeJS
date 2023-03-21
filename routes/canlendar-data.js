const express = require('express');
const router = express.Router();
const conn = require('../config/db.js');
const mysql = require('mysql2/promise');



router.get('/', async (req, res, next) => {
    const connection = await mysql.createConnection(conn.real); // DB 커넥션 생성
    await connection.connect();
    try {
        const today_date = req.body.today_date;
        const first_date = today_date + "-01";
        const last_date = today_date + "-31";


        const content_cal = `select created_date from contents where created_date between "${first_date}" and "${last_date}"; `;
        const live_broadcast_cal = `select created_date from live_broadcast where created_date between "${first_date}" and "${last_date}"; `;

        const result = await Promise.all([
            connection.query(content_cal),
            connection.query(live_broadcast_cal)
        ])


        const content_time =  result[0][0].map((el) => el.created_date);
        const live_broadcast =  result[1][0].map((el) => el.created_date);

        // for (let i of content_time) {
        //     console.log(typeof(i));
        //     const j = String(i);
        //     console.log(typeof(j));
        //     console.log(String(i));
        //     j.substring(0,10);
        //     const ij = j.substring(8,15);
        //     const ij2 = ij.split(" ");
        //     console.log(ij2[1]+"-"+ij2[0]);
        // }
            console.log(content_time);
            console.log(live_broadcast);

        return res.status(200).json({
            content: content_time,
            live_broadcast: live_broadcast
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