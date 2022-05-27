const express   = require("express");
const bcrypt    = require("bcrypt");
const jwt       = require("jsonwebtoken");

const user_game = require("../models").user_game;
module.exports = {
  createUser: async (req, res) => {
    const { username, password } = req.body;
    const hashedPasword = await bcrypt.hash(password, 10);
    user_game
      .create({
        username,
        password: hashedPasword,
      })
      .then((user) => {
        res.redirect("/");
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

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(req.body);
      const userGame = await user_game.findOne({
        where: { username: username },
      });

      if (!userGame) {
        // return res.status(404).json({
        //     message: 'User Game not found'
        // });
        res.render("index");
      }
      // const isPasswordMatch = (password) => {
      //     return userGame.password === password;
      // }
      const isPasswordMatch = await bcrypt.compare(password, userGame.password);

      if (!isPasswordMatch) {
        // return res.status(400).json({
        //     message: 'Password not match'
        // });
        res.render("index");
      }
      const token = await jwt.sign({ username }, "13wertryty45t4rfy", {
        expiresIn: "100000",
      });
      // res.render("home");
        res.json({
          user: userGame,
          token
      })
    } catch (error) {
      // res.status(500).json({
      //     message: error.message
      // });
      res.render("index");
    }
  },
};

