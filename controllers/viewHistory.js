const express = require("express");

const user_game_history = require("../models").user_game_history;
module.exports = {
  // create
  addCreate: (req, res) => {
    res.render("history/create");
  },

  createUser: (req, res) => {
    let { diamon, tiket, battle_point, item, login, logout, userId } = req.body;
    user_game_history
      .create({
        diamon,
        tiket,
        battle_point,
        item,
        login,
        logout,
        userId,
      })
      .then((user) => {
        res
          .redirect("/view/history")
          // return res
          //   .status(201)
          //   .json({
          //     message: "User created successfully",
          //     user,
          //   })
          .catch((err) => {
            return res.status(402).json({ err });
          });
      });
  },

  updateUser: (req, res) => {
    const { diamon, tiket, battle_point, item, login, logout, userId } =
      req.body;
    let id = req.params.id;

    user_game_history
      .findOne({ where: { id: id } })
      .then((user) => {
        user.update({
          diamon,
          tiket,
          battle_point,
          item,
          login,
          logout,
          userId,
        });
        res.redirect("/view/history");
      })
      .catch((error) => {
        return res.status(401).json({
          error: error,
        });
      });
  },

  // get all

  getAllUser: (req, res) => {
    user_game_history
      .findAll({
        attributes: [
          "id",
          "diamon",
          "tiket",
          "battle_point",
          "item",
          "login",
          "logout",
          "userId",
        ],
        order: [["id", "DESC"]],
      })
      .then((users) => {
        return res.render("history/history", { history: users });
        // return res.status(200).json({
        //   users,
        // });
      })
      .catch((err) => {
        return res.status(402).json({ err });
      });
  },

  // get id

  getIdUser: (req, res) => {
    let id = req.params.id;

    user_game_history
      .findByPk(id)
      .then((user) => {
        return res.render("history/update", { history: user });
        // return res.status(200).json({ user });
      })
      .catch((error) => {
        return res.status(402).json({ error });
      });
  },

  // delete

  deleteIdUser: (req, res) => {
    let id = req.params.id;

    user_game_history
      .destroy({
        where: { id: id },
      })
      .then(() => {
        res.redirect("/view/history");
        // return res.status(200).json({
        //   message: "User Deleted successfully",
        // });
      })
      .catch((error) => {
        return res.status(400).json({ error });
      });
  },
};
