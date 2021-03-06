const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const Test = require('./routes/test');
const Oauth = require('./routes/oauth');
const Company = require('./routes/company');
const Upload = require('./routes/upload');
const Item = require('./routes/item');
const ItemType = require('./routes/itemType');
const Page = require('./routes/page');
const Notice = require('./routes/notice');
require('./utils/timer');  // 启动定时器
const Play = require('./routes/play');
const Order = require('./routes/order');

// // 使用body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/userPassport')(passport);
app.use('/api/test', Test);
app.use('/api/oauth', Oauth);
app.use('/api/company', Company);
app.use('/api/upload', Upload);
app.use('/api/item', Item);
app.use('/api/itemType', ItemType);
app.use('/api/page', Page);
app.use('/api/notice', Notice);
app.use('/api/play', Play);
app.use('/api/order', Order);

app.listen(5001, () => {
    console.log('the server port running');
});