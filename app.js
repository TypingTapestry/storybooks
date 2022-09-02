const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
//These are for the user image upload - SS
const multer = require("multer");
// const cloudinary = require("cloudinary");
// const cloudinaryStorage = require("multer-storage-cloudinary");
//TODO: switch the image upload ejs file to handlebars - SS
const ejs = require("ejs");

// Load Config
dotenv.config({ path: "./config/config.env" });

// Passport Config
require("./config/passport")(passport);

connectDB();

const app = express();

//Set storage engine - need to change to DB instead of public folder
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//Init upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  },
}).single(myImage);

//Check file type
function checkFileType(file, cb) {
  //Allowed extentions
  const filetypes = /jpeg|jpg|png/;
  //Check extentions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //Check mimetype
  const mimetype = filetypes.test(file.mimetype);
  //
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: images only.");
  }
}

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method Override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require("./helpers/hbs");

// Handlebars
app.engine(
  ".hbs",
  exphbs.engine({
    helpers: { formatDate, stripTags, truncate, editIcon, select },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// Sessions
app.use(
  session({
    secret: "smile",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set Global Variable
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Static folder
app.use(express.static("./public"));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}! :)`
  )
);

//SSSSSSS - This is the image upload stuff, still working on it but wanted you guys to be able to see it

//app.get("/", (req, res) => res.render("index"));

// app.post("/upload", (res, req) => {
//   upload(res, req, (err) => {
//     if (err) {
//       res.render("index", {
//         msg: err,
//       });
//     } else {
//       if (req.file === undefined) {
//         res.render("index", {
//           msg: "Error: no file selected",
//         });
//       } else {
//         res.render("index", {
//           msg: "File uploaded",
//           file: `uploads/${req.file.filename}`,
//         });
//       }
//     }
//   });
// });
