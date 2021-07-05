const router = require("express").Router();
const { myQuery } = require("../db");
const { verifyAdmin, verifyUser } = require("../helpers/verifyUser");

router.get("/", verifyUser, async (req, res) => {
  try {
    const vacations = await myQuery("SELECT * FROM vacations;");
    res.send(vacations);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/newvacation", verifyUser, verifyAdmin, async (req, res) => {
  try {
    const { vacDest, vacDesc, startDate, endDate, vacPrice, vacImage } =
      req.body;
    if (
      !vacDest ||
      !vacDesc ||
      !startDate ||
      !endDate ||
      !vacPrice ||
      !vacImage
    ) {
      return res.status(400).send("Missing some info...");
    }
    const results = await myQuery(`
      INSERT INTO vacations (vacDest, vacDesc, startDate, endDate,vacPrice, vacImage) VALUES
      ("${vacDest}", "${vacDesc}", "${startDate}", "${endDate}", "${vacPrice}", "${vacImage}")
      `);
    const vacations = await myQuery(
      `SELECT * from vacations WHERE vacID = ${results.insertId}`
    );
    res.status(201).send(vacations[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/deletevacation", verifyUser, verifyAdmin, async (req, res) => {
  try {
    const { vacID } = req.body;
    console.log("vacID");
    console.log(vacID);
    if (!vacID) res.status(400).send("Missing some info...");
    const vacation = await myQuery(
      `DELETE FROM vacations WHERE vacID=${vacID}`
    );
    res.status(201).send(vacation);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put(
  "/editvacation/:vacID",
  verifyUser,
  verifyAdmin,
  async (req, res) => {
    try {
      const { vacID } = req.params;
      const { vacDest, vacDesc, startDate, endDate, vacPrice, vacImage } =
        req.body;
      if (
        !vacDest ||
        !vacDesc ||
        !startDate ||
        !endDate ||
        !vacPrice ||
        !vacImage
      ) {
        return res.status(400).send("Missing some info...");
      }
      await myQuery(
        `UPDATE vacations SET vacDest="${vacDest}", vacDesc="${vacDesc}", startDate="${startDate}", endDate="${endDate}",vacPrice=${vacPrice}, vacImage="${vacImage}" WHERE vacID=${vacID}`,
        (err, result) => {
          if (err) return res.status(500).send(err);
          console.log(result);
        }
      );
      const vacations = await myQuery(
        `SELECT * from vacations WHERE vacID = ${vacID}`
      );
      console.log(vacations);

      if (vacations.length) {
        res.status(201).send(vacations[0]);
      } else res.status(404).send("Not found");
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;
