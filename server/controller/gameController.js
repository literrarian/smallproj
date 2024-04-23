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
            const game = await Game.create({name, age_restriction, players_num, img: fileName})
            
            let gameId=game.id
            for (let genreId of genre_id){
                await GameGenre.create({genreId,gameId})  
            }
            
            if (detail){
                detail = JSON.parse(detail) //на фронт передадим эту штуку строкой, на беке она жаба объект
                detail.forEach(i=>
                   GameDetail.create({
                       title: i.title,
                       description: i.description,
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
    async update(req,res,next){
        try{
            const game = req.body
            const {img} = req.files
            console.log(req.files)
            let recievedDetails = JSON.parse(game.detail)
            let fileName =uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname,'..','static',fileName))
            const {id} = req.params
            if (!id){
                next(ApiError.badRequest('Такой игры не существует'))
            }
            const oldGame = await Game.findByPk(id)
            if (!oldGame){
                throw new Error('Такой игры не существует')
            }
            await oldGame.update({
                name: game.name,
                age_restriction:game.age_restriction,
                players_num:game.players_num,
                img: fileName
            })
            
            if(recievedDetails) {
                GameDetail.findAll({
                    where: {gameId: id}
                })
                    .then(existingDetails => {
                        const existingDetailsCount = existingDetails.length;
                        const receivedDetailsCount = recievedDetails.length;

                        if (existingDetailsCount === receivedDetailsCount) {
                           
                            console.log('1')
                            Promise.all(existingDetails.map((detail, index) => {
                                detail.update({
                                    title: recievedDetails[index].title,
                                    description: recievedDetails[index].description
                                });
                            }))
                                .then(updatedDetails => {
                                    console.log('Existing details updated:', updatedDetails);
                                })

                        } else if (existingDetailsCount > receivedDetailsCount) {
                           
                            console.log('2')
                            const existingDetailIds = existingDetails.map(detail => detail.id);
                            const recievedDetailIds = recievedDetails.map(detail => detail.id);

                            const excessDetailIds = existingDetailIds.filter(id => !recievedDetailIds.includes(id)); //добавить id если он не в полученных новых данных
                            GameDetail.destroy({
                                where: {id: excessDetailIds}
                            })
                                .then(numDeleted => {
                                    console.log(`${numDeleted} excess details deleted`);
                                    const promises = [];
                                    existingDetails.forEach(detail => {
                                        if (recievedDetailIds.includes(detail.id)) {
                                            const receivedDetail = receivedDetails.find(receivedDetail => receivedDetail.id === detail.id);
                                            promises.push(detail.update({
                                                title: receivedDetail.title,
                                                description: receivedDetail.description
                                            }));
                                        }
                                    });

                                })
                        } else {
                            
                            console.log('3')
                            const promises = [];

                            Object.entries(recievedDetails).forEach(([key, value], index) => {
                                if (existingDetails[index]) {
                                    
                                    promises.push(existingDetails[index].update({[key]: value}));
                                } else {
                                    
                                    const newDetail = {
                                        gameId, 
                                        title: value.title,
                                        description: value.description
                                    };
                                    promises.push(GameDetail.create(newDetail));
                                }
                            });

                            Promise.all(promises)
                                .then(results => {
                                    console.log('Details updated/added:', results);
                                })
                               
                        }
                    })
                    .catch(err => {
                        console.error('Error retrieving existing details:', err);
                        res.status(500).json({message: 'Internal server error'});
                    });
            }
            // if (game.detail) {
            //     if (oldDetail) {
            //         oldDetail = JSON.parse(oldDetail) //на фронт передадим эту штуку строкой, на беке она жаба объект
            //         oldDetail.forEach(i =>
            //             GameDetail.update({
            //                 title: i.title,
            //                 descent: i.description,
            //             }))
            //         GameDetail.save()
            //     }
            // }
            let gameId=id
            let genre_id=game.genre_id
                await GameGenre.update(
                    {genreId: genre_id},
                    {where:{gameId: gameId,}
                })
            
            
            res.status(200).json({message: "Данные обновлены"})
            await oldGame.save();

        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async remove(req,res,next){
        try {
            const { id } = req.params;
            const numDeleted = await Game.destroy({
                where: { id: id }
            });
            await GameDetail.destroy({
                where:{gameId:id}
            })
            await GameGenre.destroy({
                where:{gameId:id}
            })
            if (numDeleted === 0) {
                throw new Error('Игра не найдена');
            }

            res.status(200).json({ message: 'Игра успешно удалена' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
}

module.exports = new GameController()