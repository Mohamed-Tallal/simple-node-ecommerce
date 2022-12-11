const productData = require("../models/product.model")

exports.getProductById = (req , res , next) => {
    let id = req.params.id ; 
    let authData = req.session.userId ; 
    let AddCart = req.flash("addCart") [0] ;
    let ErrorCart = req.flash("errorCart") [0] ;
    productData.getProductById(id).then((product) => {
        console.log("product content")
        console.log(product)
        res.render('content' , {
            product : product , 
            auth :authData,
            addCart : AddCart ,
            errorCart : ErrorCart
        });
    })

}