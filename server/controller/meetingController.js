const {Meeting, MeetingPlayer} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Op} = require("sequelize");
class MeetingController{

    async create(req,res,next){
        try {
            let {name, description, game_id, age_restriction, slots_num, m_date,user_id} = req.body
            const meeting = await Meeting.create({name, description,game_id, age_restriction, slots_num, m_date,user_id})
            return res.json(meeting)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        let {game_id,slots_num,user_id,limit,page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page*limit - limit
        let meetings;

        if(!game_id && !slots_num && !user_id){
            meetings = await Meeting.findAndCountAll({limit, offset})
            return res.json(meetings)
        }
        if(game_id && !slots_num && !user_id){
            meetings = await Meeting.findAndCountAll({where: {gameid}, limit, offset})
            return res.json(meetings)
        }
        if(!game_id && slots_num && !user_id){
            meetings = await Meeting.findAndCountAll({where: {slots_num}, limit, offset})
            return res.json(meetings)
        }
        if(!game_id && !slots_num && user_id){
            meetings = await Meeting.findAndCountAll({where: {user_id}, limit, offset})
            return res.json(meetings)
        }
        if(game_id && slots_num && !user_id){
            meetings = await Meeting.findAndCountAll({where: {game_id, slots_num}, limit, offset})
            return res.json(meetings)
        }
        if(game_id && !slots_num && user_id){
            meetings = await Meeting.findAndCountAll({where: {game_id, user_id}, limit, offset})
            return res.json(meetings)
        }
        if(!game_id && slots_num && user_id){
            meetings = await Meeting.findAndCountAll({where: {slots_num, user_id}, limit, offset})
            return res.json(meetings)
        }
        if(game_id && slots_num && user_id){
            meetings = await Meeting.findAndCountAll({where: {game_id, slots_num, user_id}, limit, offset})
            return res.json(meetings)
        }
        
    }
    async getOne(req,res){
        const {id} = req.params
        const meeting = await  Meeting.findOne(
            {
                where: {id},
                include: [
                    {model:MeetingPlayer}
                ]
            }
        )
        return res.json(meeting)
    }
    async update(req,res,next){
        try{
            const meeting = req.body
            const {id} = req.params
            if (!id){
                next(ApiError.badRequest('Такой встречи не существует'))
            }
            console.log(id)
            const oldMeeting = await Meeting.findByPk(id)
            if (!oldMeeting){
                throw new Error('Такой встречи не сущеествует')
            }
            await oldMeeting.update({
                name: meeting.name,
                description: meeting.description,
                game_id: meeting.game_id,
                age_restriction:meeting.age_restriction, 
                slots_num:meeting.slots_num, 
                m_date: meeting.m_date
            }) 
            res.status(200).json({message: "Данные обновлены"})
            await oldMeeting.save();
                
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }
    async remove(req,res,next){
        try {
            const { id } = req.params;
            const numDeleted = await Meeting.destroy({
                where: { id: id }
            });

            if (numDeleted === 0) {
                throw new Error('Встреча не найдена');
            }

            res.status(200).json({ message: 'Встреча успешно удалена' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
        
    }
    //теперь работает ремув и апдейт
}

module.exports = new MeetingController()