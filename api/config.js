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
        appId: '348019630469242',
        appSecret: '2e9d721859011e27af7c484d61f2e317'
    }
};