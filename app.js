const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
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

//Method Override
app.use(methodOverride ((req, res)=>{
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        //look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method
    }
}))

//Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs');
const { type } = require('os');

//Handlebars
app.engine('.hbs', exphbs({ helpers: {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select
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

//Set Global Variable
app.use(function (req,res,next){
    res.locals.user = req.user || null
    next()
})

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 7003;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))