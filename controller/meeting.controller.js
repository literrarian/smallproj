const db = require('../db')
class MeetingController {
    async createMeeting(req,res){
        const {name,description,slots,host_id,game_id} = req.body
        const newMeeting = await db.query(`insert into player_meeting (name,description,slots,host_id,game_id) values ($1,$2,$3,$4,$5) returning *`,
            [name,description,slots,host_id,game_id])
        res.json(newMeeting.rows[0])
    }
    
    async getMeetingsByUser(req,res){
        const id = req.query.id
        const meetings = await db.query(`select * from player_meeting where host_id=$1`,[id])
        res.json(meetings.rows)
    }
}

module.exports = new MeetingController()