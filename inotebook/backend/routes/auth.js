/** @format */

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "harryisgoodboy"; // isse m apne webtoken ko sign krunga
const fetchuser = require("../middleware/fetchuser");

//  create a user using : post "/api/auth/createuser" .No login required
//  ROUTE 1
router.post(
  "/createuser",
  [
    body("name", "enter avalid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be 5 charactor").isLength({ min: 5 }),
  ],
  async (req, res) => {
      let success= false
    // if there are errors , return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    //    const user = new User(req.body)
    //    console.log(user)
    //     res.send( user);
    //     user.save();

    //    CHECK WHETHER THE USER WITH THIS EMAIL EXISTS ALREADY

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      //   m ek token bhejunga or us token me user ki id bhejunga jo database se milegi.
      // jab bhi jwt ko server se dispatch krunga ,tab me usko sign krunga uske secret se
      success=true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occupied");
    }
  }
);

//Authenticate a user using : post '/api/auth/login no login required
// ROUTE_2
router.post(
  "/login",
  [
    // body('name','enter avalid name').isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // if there are errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "please try to correct login creadientials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "please try to correct login creadientials",
          });
      }
      // payload woh data h jo user jisko m bhejunga
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      //   m ek token bhejunga or us token me user ki id bhejunga jo database se milegi.
      // jab bhi jwt ko server se dispatch krunga ,tab me usko sign krunga uske secret se
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//  Route3 get logged in user details using POST request =' api/auth/getuser No login required
router.post(
  "/getuser",
  fetchuser,
  // body('name','enter avalid name').isLength({ min: 3 }),
  async (req, res) => {
    // if there are errors , return bad request and the errors
    try {
      // auth token ko decode krke userid nikaleneg. jo jo request mang rhi ki user authenticate hona chiye m unne header bhej dunga authentication token ke naam ka.or header me se data nikal m yha pe fech kr lunga
      userId = req.user.id;
      const user = await User.findById(userId).select("-password"); // select all and exceptt the password
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);
module.exports = router;
