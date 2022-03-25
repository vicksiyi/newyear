const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const Test = require('./routes/test');
const Oauth = require('./routes/oauth');
const Page = require('./routes/page');
const Notice = require('./routes/notice');
const Item = require('./routes/item');
const Play = require('./routes/play');


// // 使用body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/userPassport')(passport);
app.use('/api/test', Test);
app.use('/api/oauth', Oauth);
app.use('/api/page', Page);
app.use('/api/notice', Notice);
app.use('/api/item', Item);
app.use('/api/play', Play);

app.listen(5000, () => {
    console.log('the user-server port running');
});