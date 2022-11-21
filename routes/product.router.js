const router = require("express").Router();

const productController = require("../controllers/product.controller");

router.get('/product/:id' , productController.getProductById);



module.exports = router ; 

