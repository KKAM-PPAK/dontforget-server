const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.get("/main", taskController.getUserTasks);
router.post("/new", taskController.createNewTask);

module.exports = router;
