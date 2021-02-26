const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//Load Config
dotenv.config({ path: './config/config.env'});

//Passport Config
require('./config/passport')(passport);

connectDB();

const app = express();

//Body Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//Handlebars Helpers
const { formatDate } = require('./helpers/hbs');

//Handlebars
app.engine('.hbs', exphbs({ helpers: {
    formatDate,
} , defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

//Session middleware [make sure its above passport]
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection})
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))