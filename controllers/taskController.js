const User = require("../models/user");
const Task = require("../models/task");

exports.createNewTask = async function (req, res, next) {
  const { memo, title } = req.body.task;
  console.log(memo);
  const { email } = req.user;

  try {
    const writer = await User.findOne({ email });
    const newTask = {
      writer: writer._id,
      title,
      memo: {
        description: memo.description,
        due_date: memo.due_date,
        noti_time: memo.noti_time,
      },
    };

    try {
      await Task.create(newTask);

      res.status(200).send("created new Task");
    } catch (error) {
      console.error(error);
      next(error);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getUserTasks = async function (req, res, next) {
  const { email } = req.user;
  try {
    const writer = await User.findOne({ email });

    if (!writer) {
      return res.status(404).send("user not found");
    }

    const tasks = await Task.find({ writer: writer._id });

    res.send(tasks);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
