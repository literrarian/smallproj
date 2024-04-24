const {Meeting, MeetingPlayer} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Op} = require("sequelize");
const uuid = require('uuid')
const path = require('path')

class MeetingController{

    async create(req,res,next){
        try {
            console.log('wtf')
            let {name, description, game_id, age_restriction, slots_num, m_date,userId} = req.body
            const {img} = req.files
            let fileName =uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname,'..','static',fileName))
            const meeting = await Meeting.create({name, description,game_id, age_restriction, slots_num, m_date,img: fileName})
            let meetingId = meeting.id
            const shoveInJointTable = await MeetingPlayer.create({userId,meetingId})
          //  console.log(shoveInJointTable)
            return res.json(meeting)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async signUserOnMeeting(req,res,next){
        try {
            const {userId,meetingId} = req.body
            console.log(userId)
            console.log(meetingId)
            const meeting_player = await MeetingPlayer.create({userId, meetingId})
           
            return res.json(meeting_player)
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
                m_date: meeting.m_date,
                img: meeting.img
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
            const {id} = req.params;
            const numDeleted = await Meeting.destroy({
                where: { id: id }
            });
            await MeetingPlayer.destroy({
                where:{meetingId:id}
            })
            if (numDeleted === 0) {
                throw new Error('Встреча не найдена');
            }

            res.status(200).json({ message: 'Встреча успешно удалена' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
        
    }
    
}

module.exports = new MeetingController()