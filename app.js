var Config = require('./config/config.js');

/**
 * db connect
 */

var mongoose = require('mongoose');
mongoose.connect([Config.db.host, '/', Config.db.name].join(''),{
    //eventually it's a good idea to make this secure
    user: Config.db.user,
    pass: Config.db.pass
});

/**
 * create application
 */

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

/**
 * app setup
 */

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//passport

var passport = require('passport');
var jwtConfig = require('./passport/jwtConfig');

app.use(passport.initialize());
jwtConfig(passport);


var userRoutes = require("./user/userRoutes");
var locationRoutes = require("./location/locationRoutes");
var catererRoutes = require("./caterer/catererRoutes");
var invitationRoutes = require("./invite/invitationRoutes");
var eventRoutes = require("./event/eventRoutes");


//app.use('/api', movieRoutes(/*passport*/));
app.use('/', userRoutes(passport));
app.use('/api', locationRoutes(/*passport*/));
/*app.use('/api/location', locationRoutes);*/
app.use('/api', catererRoutes());
app.use('/api', invitationRoutes());
app.use('/api', eventRoutes());

module.exports = app;