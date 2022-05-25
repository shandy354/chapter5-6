const express = require("express");

const user_biodata = require("../models").user_biodata;
module.exports = {
  // create
  addCreate: (req, res) => {
    res.render("biodata/create");
  },
  createUser: (req, res) => {
    let { nama, region, gender, userId } = req.body;
    user_biodata
      .create({
        nama,
        region,
        gender,
        userId,
      })
      .then((user) => {
        res.redirect("/view/biodata");
        // return res
        //   .status(200)
        //   .json({
        //     message: "User created successfully",
        //     user,
        //   })
      })
      .catch((err) => {
        return res.status(402).json({ err });
      });
  },

  updateUser: (req, res) => {
    const { nama, region, gender, userId } = req.body;
    let id = req.params.id;

    user_biodata
      .findOne({
        where: { id: id },
      })
      .then((user) => {
        user.update({ nama, region, gender, userId });
        res.redirect("/view/biodata");
      })
      .catch((error) => {
        res.status(401).json({
          error: error,
        });
      });
  },

  // get

  getAllUser: (req, res) => {
    user_biodata
      .findAll({
        attributes: ["id", "nama", "region", "gender", "userId"],
        //limit: 5,
        order: [["id", "DESC"]],
      })
      .then((users) => {
        res.render("biodata/biodata", { biodata: users });
        // return res.status(200).json({
        //   users,
        // });
      })
      .catch((err) => {
        res.status(402).json({ err });
      });
  },

  // get

  getIdUser: (req, res) => {
    let id = req.params.id;

    user_biodata
      .findByPk(id)
      .then((user) => {
        return res.render("biodata/update", { biodata: user });
        // return res.status(200).json({ user });
      })
      .catch((error) => {
        res.status(402).json({ error });
      });
  },

  // delete

  deleteIdUser: (req, res) => {
    let id = req.params.id;

    user_biodata
      .destroy({
        where: { id: id },
      })
      .then((user) => {
        res.redirect("/view/biodata");
        // return res.status(200).json({
        //   message: "User Deleted successfully",
        // });
      })
      .catch((error) => {
        
        return res.status(400).json({ error });
      });
  },
};
