const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { route } = require('./auth-routes');
const Bug = require('../models/Bugs.model.js');
const User = require('../models/User.model.js');
const Service = require('../models/Services.model.js');
const routeGuard = require('../configs/route-guard.config.js');
const moment = require('moment')

// route d'affichege de la dashboard:
router.get('/', routeGuard, (req, res, next) => {
  let user = req.session.user;
  Bug.find({})
    .populate('rapporter')
    .then(allBugsFromDB => {
      const bugs = allBugsFromDB.map(bug => {
        const normalizedBug = {
          ...bug,
          rapportedAt: {
            rapportDay: moment(bug.rapportedAt).format('ll'),
            rapportTime: moment(bug.rapportedAt).format('LT')
          }
        }

        res.json( normalizedBug)
      })
      .catch(err => {
        res.json(err);
      })

    })

})



// route de supprission de Bug
router.get('/:id/delete', routeGuard, (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Bug.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Bug with id= ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})

module.exports = router;