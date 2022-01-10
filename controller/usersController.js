const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');


// login Page
const login_render = (req,res) => {
    res.render('login')
}

// Register Page
const register_render = (req,res) => {
    res.render('register')
}

// Registering the User.
const register_user = (req,res) => {
    const{ name, email, password, password2 } = req.body;
    let errors = [];

    // check required fields
    if(!name || !email|| !password || !password2){
        errors.push({ msg: 'Please fill in all fields'});
    }

    // Check passwords match
    if(password!=password2) {
        errors.push({ msg: 'Passwords do not match '});
    }

    // Check pass length
    if(password.length < 6) {
        errors.push( { msg: 'Passwords should be at least 6 characters'})
    }

    if(errors.length > 0) {

        res.render('register', {
            errors,
            name,
            email,
            password,
            password2

        });
    } else {
        // validation passed
        User.findOne({ email: email})
         .then(user => {
             if(user){
                 // User exists
                 errors.push({msg: 'Email is already registered'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
        
                });
             } else {
                const newUser = new User({ 
                    name,
                    email,
                    password
                });

               // Hash Password
               bcrypt.genSalt(10, (err,salt) => 
               bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                   // set password to hashed
                    newUser.password = hash;
                    // save user
                    newUser.save()
                     .then(user => {
                         req.flash('success_msg', 'You are now registered and can log in');
                         res.redirect('/users/login');})
                     .catch(err => console.log(err));
               }))
                
             }
         })

    }
}


// login user.
const login_user = (req,res,next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true // automatically generates the error.
    })(req,res,next);
}

// logout user.
const logout_user = (req,res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
}

module.exports = {
    login_render,
    register_render,
    register_user,
    login_user,
    logout_user   
}