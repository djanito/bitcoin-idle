const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieEncrypter = require('cookie-encrypter')
const app = express();

require('dotenv').config();


app.use(session({
  secret: process.env.SECRET,
  name: 'game session',
  resave: true,
  saveUninitialized: true,
}))

app.use(cookieParser(process.env.SECRET.slice(0, 32)));
app.use(cookieEncrypter(process.env.SECRET.slice(0, 32)))

app.set('view engine', 'ejs');
app.set('views', '../views');
app.use(express.urlencoded({ extended: true }));

// CSS
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));

// Routers
const game = require('./routers/game');
const login = require('./routers/login');
const logout = require('./routers/logout');
const register = require('./routers/register');

// Middleware
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/', game);

// 404
app.use('*', function(req, res){
    res.status(404);
    res.sendFile("404.html", {root: "../frontend"});
});

// run the server
app.listen(process.env.PORT, () => {
	// callback executed when the server is launched
	console.log(`Express app listening on port ${process.env.PORT}`);
});
