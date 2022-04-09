const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mime = require('mime-types');
const config = require('../config');

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const ImageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        validate: {
            validator: function(value) {
                const filePath = path.join(config.uploadPath, value);

                const mimeType = mime.lookup(filePath);

                return imageMimeTypes.includes(mimeType);
            },
            message: 'Image file format is incorrect'
        }
    }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;