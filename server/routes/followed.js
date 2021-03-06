const router = require("express").Router();
const { myQuery } = require("../db");
const { verifyUser, verifyAdmin } = require("../helpers/verifyUser");

router.get("/userfollows", verifyUser, async (req, res) => {
  if (req.user.userType === 1)
    return res.status(401).send("Only for regular users");
  try {
    const { userID } = req.user;
    if (!userID) {
      return res.status(400).send("Missing some info...");
    }
    const vacations = await myQuery(
      `SELECT vacID FROM followed WHERE userID = ${userID};`
    );
    const vacationIds = vacations.map((vacation) => vacation.vacID);
    res.send(vacationIds);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/vacationfollows", verifyUser, async (req, res) => {
  try {
    console.log(req);
    const statistics = await myQuery(
      `SELECT vacations.vacID,vacations.vacDest, COUNT(followed.userID) followers from followed INNER JOIN vacations ON followed.vacID=vacations.vacID GROUP BY followed.vacID;`
    );
    res.send(statistics);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/newfollow", verifyUser, async (req, res) => {
  if (req.user.userType === 1) return res.status(401).send("Only for users");
  try {
    const { userID } = req.user;
    const { vacID } = req.body;
    if (!userID || !vacID) {
      return res.status(400).send("Missing some info...");
    }
    const follow = await myQuery(`
      INSERT INTO followed (userID, vacID) VALUES ("${userID}", "${vacID}")`);
    res.status(201).send(follow);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/deletefollow", verifyUser, async (req, res) => {
  if (req.user.userType === 1) return res.status(401).send("Only for users");
  try {
    const { userID } = req.user;
    const { vacID } = req.body;
    if (!vacID) res.status(400).send("Missing some info...");
    const vacation = await myQuery(
      `DELETE FROM followed WHERE userID = ${userID} AND vacID = ${vacID}`
    );
    res.status(201).send(vacation);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/deletefollows", verifyUser, verifyAdmin, async (req, res) => {
  try {
    const { vacID } = req.body;
    if (!vacID) res.status(400).send("Missing some info...");
    const vacation = await myQuery(`DELETE FROM followed WHERE vacID=${vacID}`);
    res.status(201).send(vacation);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
