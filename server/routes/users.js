const router = require("express").Router();
const { myQuery } = require("../db");
const { verifyUser } = require("../helpers/verifyUser");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

router.get("/me", verifyUser, async (req, res) => {
  const user = await myQuery(
    `SELECT * FROM users WHERE userID = "${req.user.userID}"`
  );
  if (user && user.length === 1) delete user[0].userPassword;
  res.json(user[0]);
});

router.post("/logout", verifyUser, async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
  });
  res.send();
});

router.post("/login", async (req, res) => {
  try {
    // make sure all info exists
    const { userName, userPassword } = req.body;
    if (!userName || !userPassword) {
      return res.status(400).send("Missing some info...");
    }
    // get users array from db
    const users = await myQuery(
      `SELECT * FROM users WHERE userName = "${userName}"`
    );
    const user = users[0];
    // make sure username registered
    if (!user) {
      return res.status(401).send("Invalid Credentials");
    }

    // make sure passwors match
    const match = await bcrypt.compare(userPassword, user.userPassword);
    if (!match) {
      return res.status(401).send("Invalid Credentials");
    }
    delete user.userPassword;
    // generate token and send it back to the user
    jwt.sign(
      {
        userID: user.userID,
        userType: user.userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        // send token
        res.cookie("token", token, {
          httpOnly: true,
        });
        res.json(user);
      }
    );
  } catch (error) {
    res.status(500).send("error");
  }
});

router.post("/register", async (req, res) => {
  try {
    // make sure all info exists
    const { firstName, lastName, userName, userPassword } = req.body;
    if (!userName || !userPassword || !lastName || !firstName) {
      return res.status(400).send("Missing some info...");
    }
    // get users array from db
    const users = await myQuery("SELECT * FROM users;");
    // try to find the user
    const user = users.find((user) => user.userName === userName);
    // make sure username isnt already in use
    if (user) {
      return res.status(400).send("Username already taken...");
    }
    // encrypt password
    const hash = await bcrypt.hash(userPassword, 10);
    console.log(hash, userPassword);
    const newUser = await myQuery(`
      INSERT INTO users (firstName, lastName, userName, userPassword) VALUES ("${firstName}", "${lastName}", "${userName}", "${hash}")
      `);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
