// Dependencies 
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user.js');

// New (login page)
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    });
});


// Delete (logout route)
router.delete('/', (req, res)=> {
    req.session.destroy((error) => {
        res.redirect('/');
    });
})
// Create (login route)
router.post('/', (req, res) => {
    // Check for an existing user
    User.findOne({
        email: req.body.email
    }, (error, foundUser) => {
        // send error message if no user found
        if (!foundUser) {
            res.send(`Oops! no user with that email address has been registered!`);
        } else {
            // if a user has been found
            // compare the given password with the hashed password 
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);
            if (passwordMatches) {
                // add the user to our session
                req.session.currentUser = foundUser;
                // redirect back to our home page
                res.redirect('/');
            } else {
                // if the passwords don't match
                res.send('Oops! Invalid credentials');
            }

        }
    }

    )

})
// Export Sessions Router
module.exports = router;