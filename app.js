const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const index_routes = require('./routes/index');
const users_routes = require('./routes/users');
const flash = require('connect-flash');
const session = require('express-session');

const mongoose = require('mongoose');

// DB config
const db = require('./config/keys').MongoURI;

// connect to Mongo
mongoose.connect(db, {useNewUrlParser: true })
    .then(() => console.log('mongo db connected..'))
    .catch(err => console.log(err));
// ejs
app.use(expressLayouts);
app.set('view engine','ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false}));

// Express Session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }))

//connect flash
app.use(flash());


// Global Variable
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Routes
app.use('/', index_routes);
app.use('/users',users_routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT} `));
