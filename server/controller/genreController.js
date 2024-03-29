﻿const {Genre} = require('../models/models')
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
}

module.exports = new GenreController()