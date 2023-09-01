const express = require('express');
const port = 8000;
const app = express();
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const flashMW = require('./config/flashMiddleware');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets')); // for getting static

app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true)

app.set('view engine', 'ejs');
app.set('views', './views')

app.use(session({
    name: 'crud_app',
    //TODO change secret before deployment 
    secret: 'blahblahcarblahblahcar',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongoUrl: 'mongodb://127.0.0.1:27017/crud_db',
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize()); //initialize passport and tell the app to use it
app.use(passport.session()); //tell the app to use passport for creating a session 
app.use(passport.setAuthenticatedUser); // used passport to set the authentication mechanism
app.use(flash()); //flash messages
app.use(flashMW.setFlash)

app.use('/', require('./routes'))

app.listen(port, function (err) {
    if (err) {
        console.log(`error in running the ${port}`)
        return;
    }
    console.log(`Server is running @ http://localhost:${port}`)
})