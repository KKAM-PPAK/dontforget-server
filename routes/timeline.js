const express = require("express");
const timelineController = require("../controllers/timelineController");

const router = express.Router();

router.get("/", timelineController.getTimeline);
router.post("/:date", timelineController.addTimeline);

module.exports = router;
