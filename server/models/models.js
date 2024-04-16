const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type:DataTypes.STRING},
    nickname:{type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER" },
    age : {type: DataTypes.DATE,  allowNull:false}
    })

const MeetingPlayer = sequelize.define('meeting_player',
    {id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},},
    {timestamps: false} )

const Meeting = sequelize.define('meeting',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull:false},
    game_id: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING, unique: true, allowNull:false},
    age_restriction: {type:DataTypes.STRING},
    slots_num:{type: DataTypes.INTEGER, allowNull:false},
    m_date: {type: DataTypes.DATE, allowNull:false},
    img:{type:DataTypes.STRING},}
    {timestamps: false})

const Game = sequelize.define('game',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull:false},
    age_restriction: {type:DataTypes.STRING},
    players_num:{type: DataTypes.STRING},
    img:{type:DataTypes.STRING},},
    {timestamps: false} )
const GameDetail = sequelize.define('game_detail',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull:false},
    description: {type:DataTypes.STRING,allowNull:false},
    img:{type:DataTypes.STRING},},
    {timestamps: false} )

const Genre = sequelize.define('genre',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull:false},
    description: {type:DataTypes.STRING},},
    {timestamps: false} )

const GameGenre = sequelize.define('game_genre',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},},
    {timestamps: false} )

// User.hasMany(Meeting)
// Meeting.belongsTo(User)
// Meeting.hasMany(User)


//Game.hasMany(Genre)
//Genre.belongsTo(Game)

Game.hasMany(GameDetail, {as:'detail'})
GameDetail.belongsTo(Game)

Genre.belongsToMany(Game, {through: GameGenre})
Game.belongsToMany(Genre, {through: GameGenre})

User.belongsToMany(Meeting, {through: MeetingPlayer})
Meeting.belongsToMany(User, {through: MeetingPlayer})

module.exports = {
    User,
    Meeting,
    MeetingPlayer,
    Game,
    GameDetail,
    Genre,
    GameGenre
    
}