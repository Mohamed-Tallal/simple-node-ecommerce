const allProducts = require("../models/product.model");

exports.getHome = (req , res , next ) => {
    //get products 
    allProducts.getAllProducts().then(products => {
        const array = products
        const key = 'category';

        const categoriesArrayUniqe = [...new Map(array.map(item =>
        [item[key], item])).values()];
        console.log(categoriesArrayUniqe)
        res.render('index' , {
            products : products,
            categories : categoriesArrayUniqe

        });
    })
    //render index . egs
}