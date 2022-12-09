const mongoos = require('mongoose') ; 
const DB_URL = "mongodb://localhost:27017/n-ecommerce" ; 
const bcrypt = require("bcrypt") ; 

const userSchema = mongoos.Schema({
    name : String ,
    email : String,
    password : String,
})

const Users = mongoos.model('users' , userSchema);

exports.addUser = (requestName , requestEmail , requestPassword ) =>  {

    return new Promise((resolve , reject) => {
        mongoos.connect(DB_URL ).then(() => {
            return Users.findOne({email:requestEmail})
        }).then(usersRes => {
            console.log(usersRes)
            if(usersRes) {            
                mongoos.disconnect();
                reject("this user is already exist")
        }else{
                return bcrypt.hash(requestPassword , 10)
            }
        }).then((hashPassword)=>{
                let userData = new Users({
                     name : requestName ,
                     email : requestEmail,
                     password : hashPassword ,
                 })
                 return   userData.save()
        }).then(() => {
            mongoos.disconnect();
            resolve('user create successfully')
        }).catch(err => {
            mongoos.disconnect();
            reject(err)
        })
    })
}

exports.userLogin = (email , password ) => {
    return new Promise((resolve, reject) => {
        const user_id = ''
        mongoos.connect(DB_URL).then(() => {
            return Users.findOne({email : email})
        }).then((userData) => {
            if(!userData){
                mongoos.disconnect();
                reject("please singup and login agine ")
            }else{
                 bcrypt.compare(password , userData.password).then((data) => {
                    mongoos.disconnect();
                    if(!data) {
                        reject("please check your password")
                    }else{   
                        resolve(userData._id)
                    }
                }).catch(err => {
                    mongoos.disconnect();
                    reject(err);
                })
            }
        }).catch((err) => {
            mongoos.disconnect();
            reject(err)
        })
    })
}
