const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')

const db = require('../config');

class User extends Model {};

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
        }
    },
    { sequelize: db, modelName: "users"}
);

module.exports = User;


User.addHook('beforeCreate', (usuario) => {
   return bcrypt.genSalt()
        .then((salt) =>{
            usuario.salt = salt;
            return bcrypt.hash(usuario.password, usuario.salt)
        })
        .then((hashed)=> usuario.password = hashed)
})

User.prototype.isValidPassword = function(password){
    return bcrypt.hash(password, this.salt)
          .then(result =>{
              return result === this.password;
        }).catch(err => console.log(err))
}