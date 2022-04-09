const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Image = require('./models/Image');


const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [sara, john] = await User.create({
        email: 'sara@gmail.com',
        password: '000',
        displayName: 'sara',
        token: '5enDI2paOqusPavVWOnwB'
    }, {
        email: 'john@mail.ru',
        password: '000',
        displayName: 'john',
        token: '8enDI2paOqusBavVWOnwL'
    });

    await Image.create({
        user: sara,
        title: 'Ocean',
        image: 'ocean.jpg'
    }, {
        user: sara,
        title: 'Nature',
        image: 'nature.jpg'
    }, {
        user: john,
        title: 'My dog',
        image: 's1.jpg'
    }, {
        user: john,
        title: 'my hobby',
        image: 'hobby.webp'
    })

    await mongoose.connection.close();
};

run().catch(e => console.log(e));