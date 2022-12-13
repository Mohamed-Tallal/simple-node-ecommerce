const Cart = require("../models/carts.model")
const Product = require("../models/product.model")

exports.addToCart = (req ,res , next) => {
    let productId = req.params.id ; 
    let userId    = req.session.userId;
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
        let SuccesDeleteProduct = req.flash('succesProduct')
        let ErrorDeleteProduct  =  req.flash('errorProduct')
        res.render('cart.ejs' , {
            cartData : cartData,
            auth : authData , 
            SuccesDeleteProduct  : SuccesDeleteProduct , 
            ErrorDeleteProduct :  ErrorDeleteProduct
        });
    }).catch(err => {
        console.log(err)
        res.redirect('back')
    })
}

exports.UpdateProductCart = (req ,res , next) => {
    let cartId = req.params.id
    let productAmount = req.body.amount 
    Cart.updateProduct(cartId ,productAmount ).then((data) => {
        req.flash('succesProduct' , data)
        res.redirect('back')    
    }).catch(err => {
        req.flash('errorProduct' , err)
        res.redirect('back')
    })


}

exports.deleteProductCart = (req ,res , next) => {
    let cartId = req.params.id
    console.log('cart id: ' + cartId)
    Cart.deleteProductCart(cartId).then((data) => {
        req.flash('succesDeleteProduct' , data)
        res.redirect('back')
    }).catch((err) => {
        req.flash('errorDeleteProduct' , err)
        res.redirect('back')
    })
}

exports.deleteAllProductCart = (req ,res , next) => {
    let userId = req.session.userId
    console.log('user id: ' + userId)
    Cart.deleteAllProductCart(userId).then((data) => {
        req.flash('succesDeleteProduct' , data)
        console.log(data)
        res.redirect('back')
    }).catch((err) => {
        req.flash('errorDeleteProduct' , err)
        console.log(err)
        res.redirect('back')
    })
}