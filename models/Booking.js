const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');

const bookingSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: Number, index: true, required: true },
        // unix-timestamp for the start time
        start: { type: Date, index: true, required: true },
        bookerId: { type: String, index: true, required: true },
        bookedEducators: {
            type: [String],
            index: true,
            required: true,
            validate: [
                userIds =>
                    !userIds ||
                    (Array.isArray(userIds) &&
                        userIds.length <= config.maxEducatorsPerBooking),
                `{PATH} contains more than ${config.maxEducatorsPerBooking} booked educators`,
            ],
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
