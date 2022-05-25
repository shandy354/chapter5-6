const express = require("express");

const router = express.Router();
const controller= require('../controllers/index')


router.get("/",(req, res)=>{
    res.render('index')
});
router.get('/register',(req, res) => {
    res.render('register')
});
// HOME REGISTER LOGIN
router.post("/register/users_create",controller.homeregis.createUser);
router.post("/login",controller.homeregis.login);


// USERGAME
router.post("/users",controller.users.createUser);
router.put("/users/:id",controller.users.updateUser);
router.get("/users",controller.users.getAllUser);
router.get("/users/:id",controller.users.getIdUser);
router.delete("/users/:id",controller.users.deleteIdUser);
// VIEW USERGAME
router.get("/view/users",controller.userView.getAllUser);
router.get("/view/users/create",controller.userView.addCreate);
router.get("/view/users/update/:id",controller.userView.getIdUser);
router.post("/view/users_create",controller.userView.createUser);
router.post("/view/users_create/:id",controller.userView.updateUser);
router.get("/view/delete/:id",controller.userView.deleteIdUser);
// USERGAME BIODATA
router.post("/biodata",controller.biodata.createUser);
router.put("/biodata/:id",controller.biodata.updateUser);
router.get("/biodata",controller.biodata.getAllUser);
router.get("/biodata/:id",controller.biodata.getIdUser);
router.delete("/biodata/:id",controller.biodata.deleteIdUser);
// VIEW
router.get("/view/biodata",controller.biodataView.getAllUser);
router.get("/view/biodata/create",controller.biodataView.addCreate);
router.get("/view/biodata/update/:id",controller.biodataView.getIdUser);
router.post("/view/biodata_create",controller.biodataView.createUser);
router.post("/view/biodata_create/:id",controller.biodataView.updateUser);
router.get("/view/biodata/delete/:id",controller.biodataView.deleteIdUser);

// USERGAME HISTORY
router.post("/history",controller.history.createUser);
router.put("/history/:id",controller.history.updateUser);
router.get("/history",controller.history.getAllUser);
router.get("/history/:id",controller.history.getIdUser);
router.delete("/history/:id",controller.history.deleteIdUser);
// VIEW
router.get("/view/history",controller.historyView.getAllUser);
router.get("/view/history/create",controller.historyView.addCreate);
router.get("/view/history/update/:id",controller.historyView.getIdUser);
router.post("/view/history_create",controller.historyView.createUser);
router.post("/view/bhistory_create/:id",controller.historyView.updateUser);
router.get("/view/history/delete/:id",controller.historyView.deleteIdUser);

module.exports = router;