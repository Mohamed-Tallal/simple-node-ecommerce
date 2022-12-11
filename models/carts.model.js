const mongoose = require('mongoose');
const DB_URL = "mongodb://localhost:27017/n-ecommerce" ; 

const cartSchema = mongoose.Schema({
    userId : String,
    name : String , 
    price : Number , 
    amount : Number , 
    productId :String,
    timestamp : String  
}) 

const Cart = mongoose.model('carts' , cartSchema)


exports.addCarts = (productData , authUserId) =>{
    return new Promise ((resolve , reject)=>{
        mongoose.connect(DB_URL).then(() => {
            return Cart.findOne({productId :productData.id ,  userId : authUserId})
        }) .then((cartResult) => {
            if(cartResult){
                console.log(cartResult)
               mongoose.disconnect();
               reject("This Product is added before to cart")
            }else{
            console.log(cartResult)
               let cart = new Cart({
                   userId : authUserId,
                   name : productData.name , 
                   price : productData.price, 
                   amount : 1, 
                   productId : productData.id,
                   timestamp : new Date()  
               });
               return cart.save()
            }
       }).then(() => {
                mongoose.disconnect()
                resolve("Product added to cart succesfully")
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
       .catch((err) => {
           mongoose.disconnect();
           reject(err)
       })
    })
}

exports.getUserCart = (userId) => {
     return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL) .then(() => {
            return Cart.find({userId : userId}) ;
            }).then((userCartData) =>{
                mongoose.disconnect()
                resolve(userCartData);
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        }).catch(errConnection => {
            mongoose.disconnect()
            reject(errConnection)
        })
}