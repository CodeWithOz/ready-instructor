const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educatorSchema = new Schema(
    {
        name: { type: String, required: true },
        type: {
            type: String,
            required: true,
            enum: ['teacher'],
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

const Educator = mongoose.model('Educator', educatorSchema);

module.exports = Educator;
