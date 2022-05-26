// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


// New (registration page)

// Create (registration route)
router.post('/', (req, res) => {
    //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    // res.send(req.body);
    
    User.create(req.body, (error, createdUser) => {
        // res.send(createdUser);
        res.redirect('/');
    })
});

// Export User Router
module.exports = router;