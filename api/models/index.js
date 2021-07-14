const User = require('./User');
const Favourites = require('./favourites')

User.hasMany(Favourites,{as: 'favourite'})


module.exports = {
    User,
    Favourites
}