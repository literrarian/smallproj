const {Genre} = require('../models/models')
const ApiError = require('../error/ApiError')
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
    async update(req,res,next){
        try{
            const genre = req.body
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

            res.status(200).json({message: "Данные обновлены"})
            await oldMeeting.save();

        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new GenreController()