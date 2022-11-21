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