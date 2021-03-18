module.exports = (app) => {
  const express = require("express");
  const morgan = require("morgan");
  const cookieParser = require("cookie-parser");
  const session = require("express-session");
  const path = require("path");
  const FileStore = require("session-file-store")(session);
  const { cookiesCleaner } = require("./auth");
  const hbs = require('hbs')

  const multer = require('multer')

  const authRouter = require('../routes/auth');
  const instructionRouter = require('../routes/instruction');
  const picturesRouter = require('../routes/pictures');

  app.use(morgan("dev"));

  app.use(multer({dest:"public/uploads"}).single("filedata"));
  // Body POST запросов.
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // initialize cookie-parser to allow us access the cookies stored in the browser.
  app.use(cookieParser());

  // initialize express-session to allow us track the logged-in user across sessions.
  app.use(
    session({
      store: new FileStore(),
      key: "user_sid",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 6000000
      }
    })
  );

  app.use(cookiesCleaner);

  app.use('/', authRouter);
  // app.use('/pictures', instructionRouter);
  // app.use('/', picturesRouter);

  // Подключаем статику
  app.use(express.static(path.join(__dirname, '..', "public")));

  // Подключаем views(hbs)rs
  app.set("views", path.join(__dirname, '..', "views"));
  app.set("view engine", "hbs");

  // console.log(__dirname);

  hbs.registerPartials(path.join(__dirname, '..', '/views/partials'));
}
