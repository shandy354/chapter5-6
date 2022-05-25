const express       = require("express");
const morgan        = require("morgan");
const bodyParser    = require("body-parser");
// const cookieParser  = require("cookie-parser");
const session       = require("express-session");
const swaggerJSON   = require("./swagger.json");
const swaggerUI     = require("swagger-ui-express");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

// konfigurasi body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

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
