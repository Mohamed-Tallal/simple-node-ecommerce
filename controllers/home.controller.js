const productsData = require("../models/product.model");

exports.getHome = (req , res , next ) => {
    //get products 
    let authData = req.session.userId ; 
    console.log("session id data")
    console.log(authData)
    let category = req.query.category;
    let AuthError = req.flash("loginError")[0];
    console.log("error login Error")
    console.log(AuthError);
    if(category && category !== 'all'){
        productsData.getFilterProduct(category).then(products => {
            res.render('index' , {
                products : products,
                categories : dataUnique(products , 'category') , 
                auth : authData , 
                authError : AuthError
            });
        })
    }else{
        productsData.getAllProducts().then(products => {
            res.render('index' , {
                products : products,
                categories : dataUnique(products , 'category'),
                auth : authData , 
                authError : AuthError
            });
        })
    }
    //render index . egs
}


const dataUnique = (array , key) => {
    const ArrayUniqe = [...new Map(array.map(item =>
        [item[key], item])).values()];
        console.log(ArrayUniqe)
        return ArrayUniqe ;
}