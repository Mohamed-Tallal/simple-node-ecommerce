const { useAttrs } = require("vue");
const Cart = require("../models/carts.model")
const Product = require("../models/product.model")

exports.addToCart = (req ,res , next) => {
    let productId = req.params.id ; 
    let userId    = req.session.userId;
    console.log("productId: " + productId)
    console.log("userId: " + userId)

    Product.getProductById(productId).then((data) => {
        let productData = data
        Cart.addCarts(productData , userId).then((data) => {
            console.log('product controller data' + data)
            req.flash("addCart", data)
            res.redirect('back')
        }).catch((err)=>{
            req.flash("errorCart", err)
            res.redirect('back')
        })
    }).catch((err) => {
        console.log(err)
    })

    
}


exports.getCart = (req , res, next) => {
    let userId = req.session.userId ;
    let authData = req.session.userId ; 
    console.log('auth user data : ' + userId)
    Cart.getUserCart(userId).then((cartData) => {
        console.log('user cart data' +cartData);
        res.render('cart.ejs' , {
            cartData : cartData,
            auth : authData , 
        });
    }).catch(err => {
        console.log(err)
    })
}