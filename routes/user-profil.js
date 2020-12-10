const mongoose = require('mongoose');
const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User.model.js');
const Service = require('../models/Services.model.js');
const { body, check, validationResult } = require('express-validator');
const router = express.Router();



// router.get('/users/:id'
// router.get('/:id/edit', (req, res, next) => {
//   Service.find({})
//     .then((servicesFromDB) => {
//       // const services = servicesFromDB.map(service => {
//       //   return { ...service, selected: service._id == user.service._id }
//       // })
//       // const roles = ['manager', 'employee', 'validator'].map(role => {
//       //   return { role, selected: role === user.role }
//       // })
//       res.status(200).json({errors: })
//       req.session.errors = undefined
//     })
//     .catch(err => next(err))
// })



// reoute.put('/users/:id)
router.put('/:id/edit',[
  check('firstname').isLength({ min: 3 }).withMessage('Firstname must have at least 3 chars'),
  check('lastname').isLength({ min: 3 }).withMessage('Lastname must have at least 3 chars')
], (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({message: validationErrors.errors.map(e => e.msg)})
  } else {
    const { firstname, lastname, service, role, imageURL } = req.body;
    User
      .findByIdAndUpdate(req.params.id, { firstname, lastname, service, role, imageURL}, { new: true })
      .populate('service')
      .then(newUser => {
        res.status(200).json({newUser});
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Saving user to database went wrong.' });
      })
  }
})

router.put('/:id/edit-password',[
  check('password')
    .isLength({ min: 8 }).withMessage('password must be at least 8 chars long.')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/).withMessage('Password must contain at least a number, an uppercase and a lowercase')
], (req, res, next) => {

  const validationErrors = validationResult(req);

  if (req.body.password != req.body.confirmPassword) {
    res.status(400).json({message:'password and confirm password fields are not identical.'})
  }
  if (!validationErrors.isEmpty()) {
    res.status(400).json({message:validationErrors.errors.map(e => e.msg) })
  } else {
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    User.findByIdAndUpdate(req.params.id, { passwordHash }, { upsert: true })
      .then(userFromDb => res.status(200).json({userFromDb}))
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Saving user to database went wrong.' })
      });
  }
})


module.exports = router;