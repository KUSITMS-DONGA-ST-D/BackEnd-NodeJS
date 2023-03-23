const express = require('express');
const router = express.Router();
const conn = require('../config/db.js');
const mysql = require('mysql2/promise');


router.get('/', async (req, res, next) => {
    const connection = await mysql.createConnection(conn.real); // DB 커넥션 생성
    await connection.connect();
    const { start_day, end_day, age, gender, category } = req.body;


    var age_list = [];
    for (ai of age) {
        if (ai === "null") {
            age_list.push('null');
            age_list.push('null');
        }
        else {
            age_list.push(String(parseInt(ai)));
            age_list.push(String(parseInt(ai) + 10));

        }
    }
    console.log(age_list);



    try {
        const user_data_query = `select * from users where (gender = "${gender[0]}" or gender ="${gender[1]}") and (category = "${category[0]}" or category = "${category[1]}" or category = "${category[2]}" or category = "${category[3]}") and (${age_list[0]}<= age && age < ${age_list[1]} or  ${age_list[2]}<= age && age < ${age_list[3]} or ${age_list[4]}<= age && age < ${age_list[5]} or  ${age_list[6]}<= age && age < ${age_list[9]} or ${age_list[10]}<= age && age < ${age_list[11]}); `;
        //const contents_data = `select * from users where ${age_list[0]}<= age && age < ${age_list[1]} or  ${age_list[2]}<= age && age < ${age_list[3]} or ${age_list[4]}<= age && age < ${age_list[5]} or  ${age_list[6]}<= age && age < ${age_list[9]} or ${age_list[10]}<= age && age < ${age_list[11]} ;`;
        const user_data = await connection.query(user_data_query);
        const user_id = user_data[0].map((el) => el.user_id);

        const comment_data_query = `select created_date from interest where created_date between "${start_day}" and "${end_day}";`;
        const interest_data_query = `select created_date from comment where created_date between "${start_day}" and "${end_day}";`;


        const { comment_data, interest_data} = await Promise.all([
            connection.query(comment_data_query),
            connection.query(interest_data_query),
        ]);

        const comment_id = comment_data[0].map((el)=> el.comment_id);
        const interest_id = interest_data[0].map((el)=> el.interest_id)





        // const new_user = `INSERT INTO USERS(username, correct_cnt) VALUES ('${String(get_user)}', 0); `
        // await connection.query(new_user);
        console.log(result2);
        return res.status(202).json(
            user_data[0]
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