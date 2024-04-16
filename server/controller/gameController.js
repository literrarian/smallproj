const {Game, GameDetail} = require('../models/models')
const {Genre} = require('../models/models')
const {GameGenre} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Op} = require("sequelize");
const uuid = require('uuid')
const path = require('path')
class GameController{

    async create(req,res,next){
        try {
            let {name, age_restriction, players_num, genre_id, detail} = req.body
            const {img} = req.files
            let fileName =uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname,'..','static',fileName))
            const game = await Game.create({name, age_restriction, players_num, img: filename})
            
            let gameId=game.id
            for (let genreId of genre_id){
                await GameGenre.create({genreId,gameId})  
            }
            
            if (detail){
                detail = JSON.parse(detail) //на фронт передадим эту штуку строкой, на беке она жаба объект
                detail.forEach(i=>
                    GameDetail.create({
                        title: i.title,
                        descent: i.description,
                        gameId: game.id
                    }))
            }
            return res.json(game)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
       
    }
    async getAll(req,res){
        let {genreId,limit,page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page*limit - limit
        console.log(genreId)
        let games;
        
        if(!genreId){
            games = await Game.findAndCountAll({include: [Genre], limit, offset})
            return res.json(games)
        }
        if(genreId){
            games = await Game.findAndCountAll({include: {model: Genre, where:{id: {[Op.eq]:genreId}}, limit, offset}
            })
        }
        return res.json(games)
    }
    async getOne(req,res){
        const {id} = req.params
        const game = await  Game.findOne(
            {
            where: {id},
                include: [
                    {model:Genre},
                    {model:GameDetail, as:'detail'}
                ]
                
            }
        )
        return res.json(game)
    }
}

module.exports = new GameController()