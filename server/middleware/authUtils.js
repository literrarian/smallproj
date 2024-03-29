const jwt = require('jsonwebtoken');

function verifyToken(token) {
    if (!token) {
        throw new Error('Пользователь не авторизован');
    }
    return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = { verifyToken };