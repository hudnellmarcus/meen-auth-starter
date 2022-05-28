// Dependencies 
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config();
const session = require('express-session');
const methodOverride = require('method-override');

// Configure Database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
    );
    
    // Routes / Controllers
    const userController = require('./controllers/users');
    app.use('/users', userController);
    
    const sessionsController = require('./controllers/sessions')
    app.use('/sessions', sessionsController);
    
    
    
    app.get('/', (req, res) => {
        if (req.session.currentUser) {
            res.render('dashboard.ejs', {
                currentUser: req.session.currentUser
            });
        }else {
        res.render('index.ejs', {
            currentUser: req.session.currentUser
          });
   } })
    











// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));




// Listener
PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening to Andre ${PORT}`)
})