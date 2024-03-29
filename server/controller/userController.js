const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
class UserController{
    async registration(req,res){
        
    }
    async login(req,res){
        
    }
    async check(req,res,next){
       const {id} = req.query; //деструктуризация. рек.квери вернет много всякого, но мы берем только id
       if (!id){
          return  next(ApiError.badRequest('Не задан id'))
       }
       res.json(id)
    }
    async getUserDetail(req,res){
        
    }
}

module.exports = new UserController()