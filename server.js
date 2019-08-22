var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Message = require('./api/models/msgModel'),
    Bot = require('./api/models/botModel'),
    bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/botdb', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('view cache');

app.set('case sensitive routing', true);
app.set('strict routing', true);
app.set('view cache', false);
app.set('x-powered-by', false);

var routes = require('./api/routes/msgRoutes');
routes(app);
app.listen(port);
console.log('Message RESTful API server started on: ' + port);