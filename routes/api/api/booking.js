const router = require('express').Router();
const Booking = require('../../../models/Booking');

router.get('/:bookingId', (req, res, next) => {
    const { bookingId } = req.params;
    Booking.findOne({ _id: bookingId })
        .then(booking => {
            if (!booking) {
                return next('no booking found');
            }
            res.status(200).json({ booking });
        })
        .catch(next);
});
