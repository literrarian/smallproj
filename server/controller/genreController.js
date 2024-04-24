const {Genre,Game} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Sequelize} = require('sequelize')
class GenreController{

    async create(req,res){
        const {name,description} = req.body
        const genre = await Genre.create({name,description})
        return res.json(genre)
    }
    async getAll(req,res){
        const genres = await Genre.findAll()
        return res.json(genres)
    }
    async getGenreCount(req,res){
        const genres = await Genre.findAll({
            attributes: [
                'id',
                'name',
                [Sequelize.fn('COUNT', Sequelize.col('games.id')), 'gameCount']
            ],
            include: [{
                model: Game,
                attributes: [],
                through: { attributes: [] } 
            }],
            group: ['genre.id', 'genre.name'], 
            raw: true
        })
        return res.json(genres)
    }
    async getOne(req,res){
        const {id} = req.params
        const genre = await  Genre.findOne(
            {
                where: {id}
            }
        )
        return res.json(genre)
    }
    async update(req,res,next){
        try{
            const genre = req.body
            console.log("это жанр нейм" + genre.name)
            const {id} = req.params
            if (!id){
                next(ApiError.badRequest('Такого жанра не существует'))
            }
            const oldGenre = await Genre.findByPk(id)
            if (!oldGenre){
                throw new Error('Такого жанра не существует')
            }
            await oldGenre.update({
                name: genre.name,
                description: genre.description
            })
            console.log(genre)
            oldGenre.save()
            res.status(200).json({message: "Данные обновлены"})
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new GenreController()