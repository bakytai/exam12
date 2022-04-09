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


module.exports = router;