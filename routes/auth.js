const router = require('express').Router()
const bcrypt = require('bcrypt')
const { cookiesCleaner, sessionChecker } = require('../middleware/auth')
const Grandma = require('../models/grandma')
const Son = require('../models/son')
const Pic = require('../models/pic')

// const saltRounds = 10;



router
  .route('/registration')
  .get((req, res) => {
    // console.log(666);
    res.render('auth/registration');
  })
  .post(async (req, res, next) => {
    try {
      // console.log(req.body.name);
      const { name, email, password, grandma, son } = req.body
      const newGrandma = new Grandma({
        name,
        email,
        password: await bcrypt.hash(password, process.env.SALT_ROUNDS),
        grandma: true,
        son: false
      })
      await newGrandma.save();
      req.session.user = newGrandma;
      res.redirect("/pictures");
    } catch (error) {
      next(error);
    }
  })

// router
//   .route("/login")
//   .get(, (req, res) => {
//     res.render("auth/login");
//   })
//   .post(async (req, res) => {
//     const { name, password } = req.body;

//     const grandma = await Grandma.findOne({ name });

//     if (grandma && (await bcrypt.compare(password, grandma.password))) {
//       req.session.user = grandma;
//       res.redirect("/pictures");
//     } else {
//       res.redirect("/login");
//     }
//   });

// router.get("/logout", async (req, res, next) => {
//   if (req.session.grandma) {
//     try {
//       await req.session.destroy();
//       res.clearCookie("user_sid");
//       res.redirect("/");
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     res.redirect("/login");
//   }
// });

module.exports = router
