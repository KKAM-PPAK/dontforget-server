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

exports.addMemo = async function (req, res, next) {
  const { taskId } = req.params;
  const { memo } = req.body;
  try {
    await Task.findByIdAndUpdate(taskId, {
      $push: { memo: { description: memo.description, due_date: memo.due_date } },
    });

    res.send("Add new Memo");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateTask = async function (req, res, next) {
  const { taskId } = req.params;
  const { task } = req.body;

  try {
    await Task.findByIdAndUpdate(taskId, { title: task });

    res.send("delete memo");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateMemo = async function (req, res, next) {
  const { taskId, memoId } = req.params;
  const { memo } = req.body.memoInfo;

  try {
    await Task.findOneAndUpdate(
      { _id: taskId, "memo._id": memoId },
      {
        $set: {
          "memo.$.description": memo.description,
          "memo.$.due_date": memo.due_date,
        },
      },
      { new: true },
    );

    res.send("update memo");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteMemo = async function (req, res, next) {
  const { taskId, memoId } = req.params;
  try {
    await Task.findByIdAndUpdate(taskId, {
      $pull: {
        memo: {
          _id: memoId,
        },
      },
    });

    res.send("delete memo");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteTask = async function (req, res, next) {
  const { taskId } = req.params;
  try {
    await Task.findByIdAndDelete(taskId);

    res.send("delete memo");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
