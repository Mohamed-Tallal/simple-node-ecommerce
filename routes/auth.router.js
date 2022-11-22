const authController = require('../controllers/auth.controller')
const router = require('express').Router();
const  bodyParser  = require("body-parser");
const bodyParserMw = bodyParser.urlencoded({extended: true})
router.get('/signup' , authController.getUserSingUp);
router.get('/login' , authController.getUserLogin);


router.post('/signup' ,bodyParserMw, authController.postUserSingUp);
router.post('/login' , bodyParserMw, authController.getUserLogin);

module.exports = router

