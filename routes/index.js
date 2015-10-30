var express = require('express');
var Handlebars = require('hbs');
var mysql = require('mysql');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var router = express.Router();

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    // in production, hide the ID and secret somehow
    clientID: "557716849061-upiujmrik7ah05fc92p0e4ki38a3fiu4.apps.googleusercontent.com",
    clientSecret: "nJ10A33GBagyT94ntGG0XNFa",
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

router.use(passport.initialize());
router.use(passport.session());

/* Set connection parameters */
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'db',
    password: 'bruins111', // need a more secure method than hardcoding here
    database: 'test'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    
    // This makes a connection to the database and populates our initial response.
    connection.query('SELECT * FROM sources', function(err, rows, fields) {
        if (err) throw err;
        res.render('index', {title: 'Express', response: rows});
    });

});

module.exports = router;