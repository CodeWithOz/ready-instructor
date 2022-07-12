const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const validator = require('validator').default;
const Booking = require('../../../models/Booking');
const { logger } = require('../../../helpers');

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

router.post(
    '/',
    [
        body('title').trim().notEmpty().escape(),
        body('description').trim().notEmpty().escape(),
        body('duration').isNumeric(),
        body('start').isNumeric(),
        body('bookerId').isMongoId(),
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
                'validation errors at POST /booking:',
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
            bookerId,
            bookedEducators,
        } = req.body;
        Booking.create({
            title,
            description,
            duration,
            start,
            bookerId,
            bookedEducators,
        })
            .then(booking => {
                logger('newly created booking:', booking);
                res.status(200).json({ booking });
            })
            .catch(next);
    }
);
