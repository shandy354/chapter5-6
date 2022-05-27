// const express       = require("express");
// const multer        = require("multer");
// // const app = express();

// const fileStorage = multer.diskStorage({
//     destination: (req, res, cb) =>{
//         cb(null,'.public/images')
//     },
//     filename: (req, res, cb) => {
//         cb(null,Date.now() + '--' + file.originalname)
//     }
// })
// const upload = multer({storage:fileStorage});

// // module.exports ={
// //     gambar: 
// // }
// app.post("/single",upload.single('image'),(req, res)=>
// {
//     console.log(req.file);
//     res.send("upload succes");
// });