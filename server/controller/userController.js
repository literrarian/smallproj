const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User,Meeting} = require('../models/models')
const {Sequelize} = require('sequelize')

const generateJwt = (id,email,role,nickname)=>{
   return jwt.sign(
        {id,email,role,nickname},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class UserController{
    async registration(req,res,next){
        const {email,password,role,nickname, age} = req.body
        if(!email||!password||!nickname){
            return next(ApiError.badRequest('Не все поля заполнены, или заполнены неверно'))
        }
        
        const sameMailUser = await User.findOne({where:{email}})
        if (sameMailUser)
        {
            return next(ApiError.badRequest('Пользователь с такой почтой уже существует'))
        }
        
        const sameNicknameUser = await User.findOne({where:{nickname}})
        if (sameNicknameUser)
        {
            return next(ApiError.badRequest('Пользователь с таким ником уже существует'))
        }
        
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email,password:hashPassword,role,nickname, age})
        const token = generateJwt(user.id,user.email,user.role,user.nickname)
        
        return res.json({token})
    }
    async login(req,res,next){
        const{email,password} = req.body
        const user = await User.findOne({where:{email}})
        if (!user)
        {
            return next(ApiError.internal('Пользователь с такой почтой не найден'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if (!comparePassword){
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJwt(user.id,user.email,user.role,user.nickname)
        return res.json({token})
    }
    async check(req,res,next){
       
        const token = generateJwt(req.user.id, req.user.email, req.user.role,req.user.nickname)
        return res.json({token})
    }
    async getOneUser(req,res){
        const {id} = req.params
        const user = await  User.findOne(
            {
                where: {id}
            }
        )
        return res.json(user)
    }
    async getCountRegDates(req,res){
        
        const user = await  User.findAll({
            attributes: [
                [Sequelize.fn('date', Sequelize.col('createdAt')), 'date'], 
                [Sequelize.fn('count', '*'), 'count'] 
            ],
            group: [Sequelize.fn('date', Sequelize.col('createdAt'))], 
            raw: true 
        })
        return res.json(user)
    }
}

module.exports = new UserController()