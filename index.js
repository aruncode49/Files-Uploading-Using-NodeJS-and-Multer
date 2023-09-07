const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// set view engine
app.set("view engine", "ejs");

// middlewares
app.use(express.urlencoded({ extended: false }));

// create storage = The disk storage engine gives you full control on storing files to disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// home get route
app.get("/", (req, res) => {
  return res.render("homepage");
});

// upload post route
app.post("/upload", upload.single("profileImage"), (req, res) => {
  const { path } = req.file;
  console.log(path);

  return res.redirect("/");
});

// listening on port 3000
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
