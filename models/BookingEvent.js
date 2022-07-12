const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');

const bookingEventSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: Number, index: true, required: true },
        // unix-timestamp for the start time
        start: { type: Date, index: true, required: true },
        bookingId: { type: String, index: true, required: true },
        bookedEducators: {
            type: [String],
            index: true,
            required: true,
            validate: [
                userIds =>
                    !userIds ||
                    (Array.isArray(userIds) &&
                        userIds.length <= config.maxEducatorsPerEvent),
                `{PATH} contains more than ${config.maxEducatorsPerEvent} booked educators`,
            ],
        },
        canceled: { type: Boolean, index: true, default: false },
        // the user that canceled the event
        canceledBy: {
            type: String,
            index: true,
        },
        complete: { type: Boolean, index: true, default: false },
    },
    {
        timestamps: true,
    }
);

const BookingEvent = mongoose.model('BookingEvent', bookingEventSchema);

module.exports = BookingEvent;
