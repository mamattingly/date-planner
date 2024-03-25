const router = require('express').Router();
const usersRoutes = require('./users');
const placesRoutes = require('./places');

router.use('/users', usersRoutes);
router.use('/places', placesRoutes);

module.exports = router;