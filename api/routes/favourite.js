const router = require("express").Router();

const { User, Favourites } = require("../models");

//add favourite, retorna la lista de favoritos del usuario
router.put("/", (req, res, next) => {
  const { userID, movie } = req.body;
  return User.findByPk(userID)
    .then(user => {
      if (user) {
        return Favourites.create(movie)
          .then(fav => user.addFavourite(fav))
          .then(user => user.getFavourite())
          .then(favs => res.status(200).json(favs.map(e => e.dataValues)));
      } else return res.sendStatus(404);
    })
    .catch(next);
});

router.get("/", (req, res, next) => {
  const { userID } = req.query;
  return User.findByPk(userID)
    .then(user => {
      if (user) {
        return user.getFavourite().then(favs => res.status(200).json(favs.map(e => e.dataValues)));
      } else return res.sendStatus(404);
    })
    .catch(next);
});

router.delete("/", (req, res, next) => {
  const { imdbID, userId } = req.query;
  Favourites.destroy({
    where: { imdbID, userId },
  })
    .then(resul => {
      User.findByPk(userId).then(user => {
        if (user) {
          return user
            .getFavourite()
            .then(favs => res.status(200).json(favs.map(e => e.dataValues)));
        } else return res.sendStatus(404);
      });
    })
    .catch(next);
});

module.exports = router;
