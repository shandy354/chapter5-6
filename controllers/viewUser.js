const express = require("express");
const bcrypt = require("bcrypt");

const user_game = require("../models").user_game;
module.exports = {
  // create
  addCreate: (req, res) => {
    res.render("usergame/create");
  },

  createUser: async (req, res) => {
    const { username, password } = req.body;
    const hashedPasword = await bcrypt.hash(password, 10);
    user_game
      .create({
        username,
        password: hashedPasword,
      })
      .then((user) => {
        res.redirect("/view/users");
        // return res
        //   .status(201)
        //   .json({
        //     message: "User created successfully",
        //     user,
        //   })
      })
      .catch((err) => {
        res.status(402).json({ err });
      });
  },

  updateUser: async (req, res) => {
    const { username, password } = req.body;
    const hashedPasword = await bcrypt.hash(password, 10);
    let id = req.params.id;

    user_game
      .findOne({
        where: { id: id },
      })
      .then((user) => {
        user.update({ username, password: hashedPasword });
        res.redirect("/view/users");
      })
      .catch((error) => {
        return res.status(401).json({
          error: error,
        });
      });
  },

  // get all users

  getAllUser: (req, res) => {
    user_game
      .findAll({
        attributes: ["id", "username", "password"],
        order: [["id", "DESC"]],
      })
      .then((user) => {
        return res.render("usergame/usergames", { usergame: user });
        // return res.status(200).json({
        //   user,
      })
      .catch((err) => {
        return res.status(402).json({ err: err.message });
      });
  },

  // get  user by id

  getIdUser: (req, res) => {
    let id = req.params.id;

    user_game
      .findByPk(id)
      .then((user) => {
        return res.render("usergame/update", { usergame: user });
        // return res.status(200).json({ user });
      })
      .catch((error) => {
        return res.status(402).json({ error });
      });
  },

  // delete user id
  deleteIdUser: (req, res) => {
    let id = req.params.id;

    user_game
      .destroy({
        where: { id: id },
      })
      .then((user) => {
        res.redirect("/view/users");
        // return res.status(200).json({
        //   message: "User Deleted successfully",
        // });
      })
      .catch((error) => {
        return res.status(400).json({ error });
      });
  },
};
