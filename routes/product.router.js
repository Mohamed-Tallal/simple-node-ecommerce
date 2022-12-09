const router = require("express").Router();
const AuthMiddleware = require('../middelware/auth.middelware')

const productController = require("../controllers/product.controller");

router.get('/product/:id' ,AuthMiddleware.isUser , productController.getProductById);



module.exports = router ; 

