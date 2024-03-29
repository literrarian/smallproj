const jwt = require('jsonwebtoken')
const {verifyToken} = require('./authUtils')

module.exports = function (req,res,next){
    if (req.method==="OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]//bearer bebebe
        const decoded = verifyToken(token);
        req.user = decoded;
        
        next();
    }
    catch (e) {
        res.status(401).json({message:"Пользователь не авторизован"})
    }
}