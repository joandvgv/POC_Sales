'use strict';
const PORT = process.env.PORT || 5001;
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser')
var server = require('http').createServer(app).listen(PORT);
var cookieParser = require('cookie-parser');


app.set('superSecret', 'userlab');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ success: false, m: "Unknown error" });
});

app.use(cookieParser());



//TODO: Make sessions with admin table. 

//app.use(SessionPolicies.hasSession);
/*
passport.use(new LocalStrategy(function(username, password, done) {
    AdminController.authStrategy(username, password, done);
}));

passport.serializeUser(function(ad,om, done) {
    done(null, admin.id);
});

passport.deserializeUser(function(id, done) {
    Admin.findOne({ where: { id: id } }).then(function(admin) {
        done(null, admin);
    });
});*/

//Loads rotues dynamically.
fs.readdirSync('./routes').forEach(function(file) {
    if (file.substr(-3) == '.js') {
        require('./routes/' + file)(app);
    }
});