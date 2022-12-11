const router = require('express').Router()
const cartController = require('../controllers/cart.controller');
const AuthMiddleware = require('../middelware/auth.middelware')
router.get('/cart' , AuthMiddleware.isUser , cartController.getCart)
router.post('/cart/:id' , AuthMiddleware.isUser,cartController.addToCart)
router.post('/cart/:id/update/:productId' , AuthMiddleware.isUser,cartController.UpdateProductCart)
router.post('/cart/:id/destroy/:productId' , AuthMiddleware.isUser,cartController.deleteProductCart)

module.exports = router