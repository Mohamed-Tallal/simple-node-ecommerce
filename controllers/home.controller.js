const productsData = require("../models/product.model");

exports.getHome = (req , res , next ) => {
    //get products 

    let category = req.query.category;
    if(category && category !== 'all'){
        productsData.getFilterProduct(category).then(products => {
            res.render('index' , {
                products : products,
                categories : dataUnique(products , 'category')
            });
        })
    }else{
        productsData.getAllProducts().then(products => {
            res.render('index' , {
                products : products,
                categories : dataUnique(products , 'category')
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