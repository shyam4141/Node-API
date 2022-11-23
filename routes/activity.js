const express = require("express");
const router = express.Router();
const ActivityData = require("../models/activitySchema");

router.post("/setActivityStatus", async (req, res) => {
  const getAllActivityData = await ActivityData.find();
  const found = getAllActivityData.find(
    (item) => item.ActivityID === req.body.ActivityID
  );

  const getExistingActivityData = getAllActivityData.filter(
    (item) => item.ActivityID === req.body.ActivityID
  );
  console.log(getExistingActivityData);
  console.log("check request body", req.body);
  if (!found) {
    const activity = new ActivityData({
      ActivityID: req.body.ActivityID,
      TaskID: req.body.TaskID,
    });
    try {
      const savedActivityData = await activity.save();
      res.json(savedActivityData);
      console.log(savedActivityData);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    try {
      const updatedActivity = await ActivityData.updateOne(
        { ActivityID: req.body.ActivityID },
        { $set: { TaskID: req.body.TaskID } }
      );
      res.json(updatedActivity);
    } catch (err) {
      res.json({ message: err });
    }
  }
});

router.get("/getActivityStatus", async (req, res) => {
  try {
    const allActivityData = await ActivityData.find();
    allActivityData.message = "success";
    console.log(allActivityData);
    res.json(allActivityData);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
