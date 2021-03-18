const router = require('express').Router()
const bcrypt = require('bcrypt')
const { sessionChecker } = require('../middleware/auth')
const Grandma = require('../models/grandma')
const Son = require('../models/son')
const Pic = require('../models/pic')

const saltRounds = 10;

router
  .route('/registration')

  .get(sessionChecker, (req, res) => {

    // console.log(666);
    res.render('auth/registration');
  })
  .post(async (req, res, next) => {
    try {

      // console.log(req.body.name);
      const { name, email, password, status, grandmaEmail } = req.body
      // console.log(name, email, password, status, grandmaEmail);
      if (status === "statusGrandma") {
        const newGrandma = new Grandma({
          name,
          email,
          password: await bcrypt.hash(password, saltRounds)
        })
        await newGrandma.save();
        req.session.user = newGrandma;
      } else {
        const grandmaNewSon = await Grandma.findOne({ email: grandmaEmail })
        if (grandmaNewSon) {
          const newSon = new Son({
            name,
            email,
            password: await bcrypt.hash(password, saltRounds),
            grandma: grandmaNewSon
          })
          await newSon.save();
          req.session.user = newSon;
        } else {
          res.redirect("/registration");
        }
      }
      res.redirect("/pictures");
    } catch (error) {
      next(error);
    }
  })

router
  .route("/login")

  .get(sessionChecker, (req, res) => {
    res.render("auth/login");
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password );

    const grandma = await Grandma.findOne({ email: email });
    // console.log(grandma);
    const son = await Son.findOne({ email: email });
    // console.log(son);
    if (grandma && grandma.email && (await bcrypt.compare(password, grandma.password))) {
      req.session.user = grandma;
      res.redirect("/pictures");
    } else if (son && son.email && (await bcrypt.compare(password, son.password))) {
      console.log(son.email);
      req.session.user = son;
      res.redirect("/pictures");
    } else {
      res.redirect("/login");
    }
  });

router.get("/logout", async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie("user_sid");
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router
