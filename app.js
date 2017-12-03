var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash")
var LocalStrategy = require("passport-local")
var methodOverride =require("method-override");
var session = require("express-session");

var User = require("./models/user");
// routes
var userRoute = require("./routes/user");
var recordRoute = require("./routes/records");

app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/medrecord', {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"))
app.use(session({
    secret: 'medical records',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(flash());

app.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.flash = req.flash();
    next();
})

app.get('/', function(req, res) {
    res.redirect('/user/signin');
})
app.use('/', recordRoute);
app.use('/user', userRoute);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('server started');
})