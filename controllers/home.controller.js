const productsData = require("../models/product.model");

exports.getHome = (req , res , next ) => {
    //get products 
    let authData = req.session.userId ; 
    console.log("session id data")
    console.log(authData)
    let category = req.query.category;
    /**
     console.log("error login Error")
    console.log(AuthError);
    console.log("cart res: " , req.flash("addCart")[0]);
    console.log("cart res: " , req.flash("errorCart")[0]);
     */

    let AuthError = req.flash("loginError")[0];
    let AddCart = req.flash("addCart") [0] ;
    let ErrorCart = req.flash("errorCart") [0] ;
    
    if(category && category !== 'all'){
        productsData.getFilterProduct(category).then(products => {
            res.render('index' , {
                products : products,
                categories : dataUnique(products , 'category') , 
                auth : authData , 
                authError : AuthError, 
                addCart : AddCart ,
                errorCart : ErrorCart
            });
        })
    }else{
        productsData.getAllProducts().then(products => {
            res.render('index' , {
                products : products,
                categories : dataUnique(products , 'category'),
                auth : authData , 
                authError : AuthError,
                addCart : AddCart ,
                errorCart : ErrorCart
            });
        })
    }
}


const dataUnique = (array , key) => {
    const ArrayUniqe = [...new Map(array.map(item =>
        [item[key], item])).values()];
        console.log(ArrayUniqe)
        return ArrayUniqe ;
}