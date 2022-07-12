const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const validator = require('validator').default;
const BookingEvent = require('../../models/BookingEvent');
const { logger } = require('../../helpers');

router.get('/:bookingEventId', (req, res, next) => {
    const { bookingEventId } = req.params;
    BookingEvent.findOne({ _id: bookingEventId })
        .then(booking => {
            if (!booking) {
                return next('no booking event found');
            }
            res.status(200).json({ booking });
        })
        .catch(next);
});

router.post(
    '/',
    [
        body('title').trim().notEmpty().escape(),
        body('description').trim().notEmpty().escape(),
        body('duration').isNumeric(),
        body('start').isNumeric(),
        body('bookingId').isMongoId(),
        body('bookedEducators')
            .isArray()
            .custom(bookedEducators =>
                bookedEducators.every(educatorId =>
                    validator.isMongoId(educatorId)
                )
            ),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger(
                'validation errors at POST /event:',
                JSON.stringify(errors.array())
            );
            return next(errors);
        }
        next();
    },
    (req, res, next) => {
        const {
            title,
            description,
            duration,
            start,
            bookingId,
            bookedEducators,
        } = req.body;
        BookingEvent.create({
            title,
            description,
            duration,
            start,
            bookingId,
            bookedEducators,
        })
            .then(bookingEvent => {
                logger('newly created bookingEvent:', bookingEvent);
                res.status(200).json({ event: bookingEvent });
            })
            .catch(next);
    }
);

module.exports = router;
