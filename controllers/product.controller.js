const productData = require("../models/product.model")

exports.getProductById = (req , res , next) => {
    let id = req.params.id ; 
    productData.getProductById(id).then((product) => {
        console.log("product content")
        console.log(product)
        res.render('content' , {
            product : product
        });
    })

}