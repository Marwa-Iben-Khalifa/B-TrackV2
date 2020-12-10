const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { route } = require('./auth-routes');
const Bug = require('../models/Bugs.model.js');
const User = require('../models/User.model.js');
const Service = require('../models/Services.model.js');
const routeGuard = require('../configs/route-guard.config.js');
const moment = require('moment')

// router.get('/', routeGuard, (req, res) => {
//   return res.render('/repport', {user: req.session.user} );
// });
router.get('/repport', (req, res) => {

  Bug.find({})
    .then(result => {
      console.log('result', result)
      const bugs = {
        bugTypes: ['Confirmed', 'In Progress', 'Resolved'],
        countByType: [
          result.reduce((sum, current) => current.status === 'Confirmed' ? sum +1 : sum, 0),
          result.reduce((sum, current) => current.status === 'In Progress' ? sum +1 : sum, 0),
          result.reduce((sum, current) => current.status === 'Resolved' ? sum +1 : sum, 0)
        ]
      }
      console.log('bugs', bugs)
      return res.status(200).json({bugs});
    })
});

module.exports = router;