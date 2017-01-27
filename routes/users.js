var express = require('express');
var router = express.Router();
var models = require('../server/models/index');
/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll({}).then(function(users) {
    res.render('users/index', {
      title: 'fazbook',
      users: users
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('users/new', {
    title: 'new'
  });
});

//This uses the Sequelize model create method to add a user record to the
// database. The object you provide tells it what attributes to set.
// After the user record is committed to the db, the then callback
// redirects us to the users index page.
router.post('/', function(req, res, next) {
  models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
  }).then(function() {
    res.redirect('/users')
  });
});

router.delete('/:id', function(req, res, next) {
  models.User.destroy({
    where: { id: req.params.id }
  }).then(function(user) {
    res.redirect('/users');
  });
});

router.get('/:id', function(req, res, next) {
  models.User.findById(req.params.id).then(function(user) {
    res.render('users/show', { user: user });
  });
});

module.exports = router;
