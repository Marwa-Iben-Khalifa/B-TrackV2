const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const passport = require('passport');
const { body, check, validationResult } = require('express-validator');

const User = require('../models/User.model.js');
const Service = require("../models/Services.model.js");

const router = express.Router();


router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  passport.authenticate("local", (err, theUser, failureDetails) =>{
    if (err) {
      res.status(500).json({message: 'Something went wrong authenticating user'});
      return;
    }
    if (!theUser) {
      res.status(401).json(failureDetails); // `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({message: 'Session save went bad.'});
        return;
      }
      // We are now logged in (thats why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
})


//   const { email, password } = req.body

//   // return si email et email sont vides
//   if (!email || !password) {
//     res.render('auth/login', {
//       errorMessage: 'Please enter both, email and password to login.'
//     });
//     return; // STOP
//   }
//   // Sinon:
//   User.findOne({ email: email })
//     .populate('service')
//     .then(user => {
//       if (!user) {
//         res.status(400).json({message: 'Incorrect email/password' })
//         return; // STOP
//       }

//       // comparer le password fourni avec le password (hashé) en base
//       if (bcrypt.compareSync(password, user.passwordHash)) {
//         console.log('user ok', user)
//         req.session.currentUser = user
//         res.json(user)
//       } else {
//         res.status(400).json({message: 'Incorrect email/password' })
//       }
//     })
//     .catch(err => {
//       next(err)
//     })

// })



router.get("/signup", (req, res, next) => {
  Service.find({})
    .populate('service')
    .then(servicesFromDB => {
      res.json(servicesFromDB)
    })
    .catch(err => {
      res.json(err);
    })
});

router.post('/signup', [
  body('firstname', 'last name must have at least 3 chars').isLength({ min: 3 }),
  body('lastname', 'last name must have at least 3 chars').isLength({ min: 3 }),
  body('email', 'email is not valid').isEmail(),
  check('password')
    .isLength({ min: 8 }).withMessage('password must be at least 8 chars long.')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/).withMessage('Password must contain at least a number, an uppercase ans a lowercase')
], async (req, res) => {

  const { firstname, lastname, service, role, email, imageURL } = req.body;

  const validationErrors = validationResult(req);
  if (req.body.password != req.body.confirmPassword) {
    
    return res.status(400).json({message: ['password and confirm password fields are not identical.']})
  }
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({message: validationErrors.errors.map(e => e.msg)})
    
  } else {
    const isUserExist = await User.findOne({email: req.body.email})
    if(isUserExist) {
      return res.status(400).json({message: ['a user already exist with that email address.']})
      
    } else {
      const passwordHash = bcrypt.hashSync(req.body.password, 10); 
      const aNewUser = new User({firstname, lastname, service, role, email, passwordHash, imageURL});
      aNewUser.save()
      .then(() => {
        req.login(aNewUser, (err) => {
          if (err) {
            return res.status(500).json({message: 'Login after signup went bad.'});
            
          }
      
          res.status(201).json(aNewUser);
        });
      })
      .catch(err => {
        res.status(500).json({ message: 'Saving user to database went wrong.' });
      })
    }
  }
})

router.get("/logout", (req, res) => {
  req.logout();
  res.status(204).send({ message: 'logged out with success!' });
});

router.get("/loggedin", (req, res, next) => {
  if (req.user) {
    return res.status(200).json(req.user);
    
  }

  res.status(403).json({message: 'Unauthorized'});
});

module.exports = router;

