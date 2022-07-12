const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationProviderSchema = new Schema(
    {
        name: { type: String, required: true },
        level: {
            type: String,
            required: true,
            enum: ['ceo', 'hrMgr', 'acadMgr'],
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

const EducationProvider = mongoose.model(
    'EducationProvider',
    educationProviderSchema
);

module.exports = EducationProvider;
