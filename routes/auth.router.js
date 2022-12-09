const authController = require('../controllers/auth.controller')
const router = require('express').Router();
const  bodyParser  = require("body-parser");
const check =  require("express-validator").check;
const bodyParserMw = bodyParser.urlencoded({extended: true})
router.get('/signup' , authController.getUserSingUp);
router.get('/login' , authController.getUserLogin);


router.post('/signup' ,
            bodyParserMw,
            check('username').not().isEmpty().withMessage('Username is required').isString().withMessage('Username must be a string').isLength({ min: 5 }).withMessage('Username must be at least 5 chars'),
            check('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
            check('password').not().isEmpty().withMessage('Password is required').isLength({min:6}).withMessage('Password must be at least 6 chars'),
            check('password_confirmed').not().isEmpty().custom((value , {req}) => {
                if (value === req.body.password) return true 
            }).withMessage('password is not matched'),
            authController.postUserSingUp
);
router.post('/login' , 
            bodyParserMw,
            check('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
            check('password').not().isEmpty().withMessage('Password is required'),
            authController.postUserLogin);

router.post('/logout'  , authController.logout)

module.exports = router

