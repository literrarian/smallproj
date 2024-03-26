const db = require ('../db')
class UserController{
    async createUser(req,res)
    {
        const {name, surname} = req.body
        const newUser = await db.query(`insert into player (name, surname) values ($1,$2) returning *`, [name, surname]) //name = $1 surname = $2
        console.log(name,surname)
        res.json(newUser.rows[0])
    }
    async getUsers(req,res){
        const users = await db.query(`select * from player`)
        res.json(users.rows)
    }
    async getOneUser(req,res){
        const id = req.params.id //из параметров запроса
        const user = await db.query(`select * from player where  id = $1`,[id])
        res.json(user.rows[0])
    }
    async updateUser(req,res){
        const {id, name, surname} = req.body
        const user = await db.query(`update player set name=$1, surname=$2 where id=$3 returning *`, 
            [name,surname,id])
        res.json(user.rows[0])
    }
    async deleteUser(req,res){
        const id = req.params.id 
        const user = await db.query(`delete from player where  id = $1`,[id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController()