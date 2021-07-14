const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/favourites', require('./favourite'))
router.use('/users', require('./users'))

module.exports = router;