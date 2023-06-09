const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const contents = require('./routes/contents-data');
const canlendar = require('./routes/canlendar-data');
const memo = require('./routes/memo-data');


app.set('port', process.env.PORT || 3000);

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/contents-data', contents);
app.use('/canlendar-data', canlendar);
app.use('/memo',memo);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});