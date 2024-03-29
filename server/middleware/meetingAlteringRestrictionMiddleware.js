const Meeting = require('../models/models')
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./authUtils');

module.exports = async function restrictToOwnMeeting(req, res, next) {
    
    const token =  req.headers.authorization.split(' ')[1]; 
    const meetingId = req.params.id; 
    try {
        const decoded = verifyToken(token);
        const meeting = await Meeting.findByPk(meetingId);
        if (!meeting) {
            return res.status(404).json({ message: "Встреча не найдена" });
        }
        const userId = decoded.userId;
        
        if (meeting.userId !== userId) {
            return res.status(403).json({ message: "Доступ запрещен, вы не владелец встречи" }); 
        }
        next(); 
    } catch (error) {
        console.error("Ошибка при доступе к данным встречи:", error);
        return res.status(500).json({ message: "Ошибка" });
    }
}