const authUser = require("../models/users.model");
const validationResult = require('express-validator').validationResult;
exports.postUserSingUp = (req , res , next ) =>  {
    if(validationResult(req).isEmpty()){
        let name = req.body.username ;
        let email = req.body.email ;
        let password = req.body.password ;
        authUser.addUser(name , email , password).then(() => {
            res.redirect('/login')
        }).catch(err => {
            req.flash('singUpError' , err)
            res.redirect('/signup')
        })
    }else{
        req.flash("validationError" , validationResult(req).array())
        res.redirect('/signup')
    }
}

exports.getUserSingUp = (req , res , next) => {
    let authError  = req.flash('singUpError')[0]
    let validatorError = req.flash("validationError")
    let authData = req.session.userId ; 
    console.log("sign up error")
    console.log(authError)
    res.render('auth/singup' , {
        authLogin  : authError , 
        auth : authData,
        validatorError  :validatorError
    });
}

exports.getUserLogin = (req , res , next) => {
    let loginError = req.flash('loginError' )[0]
    let validatorError = req.flash("validationError")
    console.log(validatorError)
    let authData = req.session.userId ; 
    res.render('auth/login'  , {
        authError :  loginError, 
        auth: authData ,
        validatorError :validatorError
    });
}

exports.postUserLogin = (req , res , next) => {
    console.log(validationResult(req).array())
    if(validationResult(req).isEmpty()){
        let email = req.body.email; 
        let password = req.body.password; 
        authUser.userLogin(email , password).then(id => {
            req.session.userId = id
            console.log('session data')
            console.log(req.session.userId)
            res.redirect('/')
        }).catch(err => {
            req.flash('loginError' , err);
            res.redirect('/login')
        });
    }else{
        req.flash("validationError" ,  validationResult(req).array())
        res.redirect('/login')
    }
}


exports.logout = (req , res , next) => {
    req.session.destroy(()=>{
        res.redirect('/login');
    })
}