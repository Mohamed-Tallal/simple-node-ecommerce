const mongoos = require('mongoose');
const DB_URL = "mongodb://localhost:27017/n-ecommerce"; 

const productSchema = mongoos.Schema({
    name        : String ,
    desc        : String , 
    price       : Number ,
    image       : String ,
    category    : String ,
});
 
const Products  = mongoos.model('products' , productSchema);

exports.getAllProducts = () => {
    return new Promise((resolve , reject) => {
        mongoos.connect(DB_URL ).then(()=> {
            return Products.find({})
            
        }).then(productsRes => {
                mongoos.disconnect()
                resolve(productsRes)
        }).catch(err =>{
            reject(err)
        })
    })
    
}

exports.getFilterProduct = (category) =>{
    console.log(category);
    return new Promise((resolve , reject) => {
        mongoos.connect(DB_URL ).then(()=> {
            return Products.find({category: category})
        }).then(productsResFilter => {
                mongoos.disconnect()
                resolve(productsResFilter)
        }).catch(err =>{
            reject(err)
        })
    }) 
}


exports.getProductById = (id) => {
    console.log("id of product equal : " + id )
    return new Promise((resolve , reject) => {
        mongoos.connect(DB_URL) .then(() => {
            return Products.findById(id)
        }).then((productRes) => {
            mongoos.disconnect()
            resolve(productRes)
        }).catch(err => { 
            reject(err)
        })
    })
}