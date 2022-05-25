const express     = require("express");
const bcrypt      = require("bcrypt");
const jwt         = require("jsonwebtoken");

const user_game = require("../models").user_game;
module.exports = {
  // create
  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashed = await bcrypt.hash(password, 10);
      const user = await user_game.create({
        username,
        password: hashed,
      });
      res.status(201).json({
        message: "User created successfully",
        token: await jwt.sign(
          { username: user.username, password: user.password },
          "13wertryty45t4rfy",
          {
            expiresIn: "100000",
          }
        ),
        // result :user
      });
    } catch (err) {
      return res.status(402).json({ err: err.message });
    }
  },

  updateUser: async (req, res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    let id = req.params.id;

    user_game
      .findOne({
        where: { id: id },
      })
      .then((user) => {
        if (user) {
          user.update({ username, password: hashed }).then((updateUser) => {
            return res.status(202).json({
              message: "User updated successfully",
              updateUser,
            });
          });
        } else {
          return res.status(200).json({
            message: "User not found",
          });
        }
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
      .then((users) => {
        return res.status(200).json({
          users,
        });
      })
      .catch((err) => {
        return res.status(402).json({ err });
      });
  },

  // get  user by id

  getIdUser: (req, res) => {
    let id = req.params.id;

    user_game
      .findByPk(id)
      .then((user) => {
        return res.status(200).json({ user });
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
      .then(() => {
        return res.status(200).json({
          message: "User Deleted successfully",
        });
      })
      .catch((error) => {
        return res.status(400).json({ error });
      });
  },
};
