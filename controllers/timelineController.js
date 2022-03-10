const User = require("../models/user");

exports.addTimeline = async function (req, res, next) {
  const { timeline } = req.body;
  const { date } = req.params;
  const { email } = req.user;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          timeline: {
            polyline: timeline,
            created_at: date,
            distance: 2,
          },
        },
      },
      {
        new: true,
      },
    );

    res.status(200).send("Added timeline");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getTimeline = async function (req, res, next) {
  const { email } = req.user;

  try {
    const user = await User.findOne({ email });

    res.status(200).send(user.timeline);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
