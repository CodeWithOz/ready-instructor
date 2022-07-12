const router = require('express').Router();

router.use('/booking', require('./booking'));
router.use('/event', require('./bookingEvent'));

module.exports = router;
