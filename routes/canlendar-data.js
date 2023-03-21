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


        const content_time = result[0][0].map((el) => el.created_date);
        const live_broadcast = result[1][0].map((el) => el.created_date);
        var content_list = [];
        var live_broadcast_list = [];

         
        for (var content of content_time) {
            console.log(getYmd10(content));
            content_list.push(getYmd10(content));
        }
        for (var live of live_broadcast) {
            console.log(getYmd10(live));
            live_broadcast_list.push(getYmd10(live));
        }


        console.log(content_list);
        console.log(live_broadcast_list);

        return res.status(200).json({
            content: content_list,
            live_broadcast: live_broadcast_list
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

function getYmd10(i) {
    //yyyy-mm-dd 포맷 날짜 생성
    var d = i;
    return d.getFullYear() + "-" + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString());
}

module.exports = router;