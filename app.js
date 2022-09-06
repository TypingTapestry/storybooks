const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');

// Load Config
dotenv.config({ path: './config/config.env' });

// Passport Config
require('./config/passport')(passport);

connectDB();

const app = express();

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method Override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    };
}));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

// Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs');

// Handlebars
app.engine('.hbs', exphbs.engine({ helpers: { formatDate, stripTags, truncate, editIcon, select }, defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: 'smile',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set Global Variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

// Static Folder
app.use(express.static('./public'));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}! :)`));