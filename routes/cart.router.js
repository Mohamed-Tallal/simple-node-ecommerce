const router = require('express').Router()
const cartController = require('../controllers/cart.controller');
const AuthMiddleware = require('../middelware/auth.middelware');
const  bodyParser  = require("body-parser");
const bodyParserMw = bodyParser.urlencoded({extended: true})
 
router.get('/cart' , bodyParserMw , AuthMiddleware.isUser , cartController.getCart)
router.post('/cart/:id' , bodyParserMw , AuthMiddleware.isUser,cartController.addToCart)
router.post('/cart/:id/update/' , bodyParserMw , AuthMiddleware.isUser,cartController.UpdateProductCart)
router.post('/cart/:id/destroy/' , bodyParserMw , AuthMiddleware.isUser,cartController.deleteProductCart)
router.post('/cart/destroy/all/' , bodyParserMw , AuthMiddleware.isUser,cartController.deleteAllProductCart)

module.exports = router