function userMiddleware(req,res,next){
    if (req.session.userLogged ){
        usuario=req.session.userLogged;
        res.locals.userLogged = req.session.userLogged;
        res.redirect('/profile')
    }
    next();
}

module.exports=userMiddleware;