const express = require('express');
const path = require("path");
const auth = require("../middleware/auth");
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const Image = require('../models/Image');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get("/", async (req, res, next) => {
    try {
        let query = {};

        if (req.query.user) {
            query.user = req.query.user;
        }

        const images = await Image.find(query).populate('user');
        return res.send(images);
    } catch(e) {
        next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        if (req.user) {
            const imageData = {
                user: req.user._id,
                title: req.body.title,
                image: req.file.filename,
            };

            const image = new Image(imageData);

            await image.save();

            return res.send({message: 'Created new image'});
        }

        return res.send({message: 'You can t post!'});
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', auth, async (req,res,next) => {
    try {
        const imageAuthor = await Image.findById(req.params.id);

        if (req.user._id.toString() === imageAuthor.user._id.toString()) {
            await Image.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted image!'});
        }

        return res.send({message: 'You cannot delete!'});
    } catch (e) {
        next(e);
    }
});
module.exports = router;