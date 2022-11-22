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
            return Users.find({email:requestEmail})
        }).then(usersRes => {
            console.log(usersRes)
            if(usersRes) {
                mongoos.disconnect();
                reject("this user is already exist")
            }else{
               const userData = new Users({
                    name : requestName ,
                    email : requestEmail,
                    password : bcrypt.hash(requestPassword, 10) ,
                })
                userData.save()
                return userData;
            }
        }).then((userRe) => {
            mongoos.disconnect();
            resolve(userRe)
        }).catch(err => {
            mongoos.disconnect();
            reject(err)
        })
    })
}

exports.userLogin = (email , password ) => {
    return new Promise((resolve, reject) => {
        mongoos.connect(DB_URL).then(() => {
            return Users.findOne({email : email})
        }).then((userData) => {
            if(!userData){
                mongoos.disconnect();
                reject("please singup and login agine ")
            }else{
                return bcrypt.compare(password , userData.password)
            }
        }).then((data) => {
            mongoos.disconnect();
            resolve(data)
        }).catch(err => {
            mongoos.disconnect();
            reject(err);
        })
    })
}
