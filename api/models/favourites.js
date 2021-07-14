const { Model, DataTypes } = require('sequelize');

const db = require('../config');

class Favourites extends Model {};

Favourites.init(
    {
        imdbID: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Poster: {
            type: DataTypes.STRING,

        },
        Year: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Type: {
            type: DataTypes.STRING,
        }
    },
    { sequelize: db, modelName: "favourites"}
);

module.exports = Favourites;