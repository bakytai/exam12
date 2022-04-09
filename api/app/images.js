const express = require('express');
const path = require("path");
const auth = require('/middleware/auth');
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const Image = require('/models/Image');

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
        let cocktails;
        const role = req.get('role');

        if (role === 'anonymous' || role === 'user') {
            cocktails = await Cocktail.find({is_published: true});
        }

        if (role === 'admin') {
            cocktails = await Cocktail.find();
        }

        return res.send(cocktails);
    } catch(e) {
        next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.recipe || !req.body.ingredients) {
            return res.status(400).send({message: 'fields are required'});
        }

        const cocktailData = {
            user: req.user._id,
            title: req.body.title,
            recipe: req.body.recipe,
            image: null,
            is_published: false,
            ingredients: JSON.parse(req.body.ingredients)
        };

        if (req.file) {
            cocktailData.image = req.file.filename;
        }

        if(req.user.role === 'admin') {
            cocktailData.is_published = true
        }

        const cocktail = new Cocktail(cocktailData);

        await cocktail.save();

        return res.send({message: 'Created new cocktail', id: cocktail._id});
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', auth, async (req,res,next) => {
    try {
        if (req.user.role === 'admin') {
            await Image.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted image!'});
        }

        return res.send({message: 'You cannot delete!'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;