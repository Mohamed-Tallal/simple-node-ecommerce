

exports.isUser = (req , res , next) =>{
    let userSessionId = req.session.userId
    if (userSessionId) next()
    else{
        req.flash('loginError' , "Please login first")
        res.redirect('/');
    } 
}