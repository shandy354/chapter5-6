const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const multer = require("multer");
// const cookieParser  = require("cookie-parser");
const session = require("express-session");
const swaggerJSON = require("./swagger.json");
const swaggerUI = require("swagger-ui-express");

const app = express();

app.use(express.json());
app.use(morgan("dev"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cookieParser());

// app.use(
//   session({
//     secretKey:'13wertryty45t4rfy',
//     resave : false,
//     saveUninitialized:false,
//     cookie:{
//       expires:500000
//     }
//   })
// )

// upload Foto/gambar
const fileStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorage });
app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("upload succes");
});

// uplod video
const videoStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./public/videos");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 10000000, //10mb
  },
  fileFilter(req, file, cb) {
    // upload haya dengan format mp4 and mkv
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error("Please upload a video"));
    }
    cb(undefined, true);
  },
});
app.post(
  "/video",
  videoUpload.single("video"),
  (req, res) => {
    console.log(req.file);
    res.send(req.file);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
// route
const router = require("./routes/index");
app.use(router);
// swagger
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));
// set templating engine  ejs
app.set("view engine", "ejs");

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
