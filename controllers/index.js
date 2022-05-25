const users         = require("./usergame");
const biodata       = require("./userbiodata");
const history       = require("./history");
const homeregis     = require("./homeregis");

// VIEW
const userView      = require("./viewUser");
const biodataView   = require("./viewBiodata");
const historyView   = require("./viewHistory");

const controller = {};

controller.homeregis    = homeregis;
controller.users        = users;
controller.biodata      = biodata;
controller.history      = history;
// VIEW
controller.userView     = userView;
controller.biodataView  = biodataView;
controller.historyView  = historyView;

module.exports = controller;
