const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.get("/main", taskController.getUserTasks);
router.post("/new", taskController.createNewTask);
router.post("/:taskId/new", taskController.addMemo);
router.put("/:taskId", taskController.updateTask);
router.put("/:taskId/:memoId", taskController.updateMemo);
router.delete("/:taskId/:memoId", taskController.deleteMemo);
router.delete("/:taskId", taskController.deleteTask);

module.exports = router;
