const authUser = require("../models/users.model");

exports.postUserSingUp = (req , res , next ) =>  {

    let name = req.body.username ;
    let email = req.body.email ;
    let password = req.body.password ;
    authUser.addUser(name , email , password).then(user => {
        res.render('auth/login' , {
            user : user
        })
    })
}

exports.getUserSingUp = (req , res , next) => {
    res.render('auth/singup');
}

exports.getUserLogin = (req , res , next) => {
    res.render('auth/login');
}

exports.postUserLogin = (req , res , next) => {
    let email = req.body.email; 
    let password = req.body.password; 
    authUser.userLogin(email , password).then(authUser => {
        res.send("it work");
        console.log(authUser)
    });
    res.render('auth/login');
}