const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/galleryApp',
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: '1030414684228398',
        appSecret: 'eb6ff2b4bca355da3e20a351e59692a2'
    }
};