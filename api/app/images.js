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
        const images = await Image.find();
        return res.send(images);
    } catch(e) {
        next(e);
    }
});

router.delete('/:id', auth, async (req,res,next) => {
    try {
        const imageAuthor = await Image.findById(req.params.id).populate('user', '_id');
        console.log(imageAuthor)

        if (req.user._id === imageAuthor.user) {
            await Image.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted image!'});
        }

        return res.send({message: 'You cannot delete!'});
    } catch (e) {
        next(e);
    }
});
module.exports = router;