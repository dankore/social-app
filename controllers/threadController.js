const Thread = require("../models/Thread");


exports.show = async function(req, res) {
  try {
    let threadz = await Thread.find();
    res.render("thread", { threads: threadz });
  } catch {}
};

exports.create = (req, res) => {
  let thread = new Thread(req.body);
  
  thread
    .create()
    .then(() => {
      res.redirect("/thread");
    })
    .catch(() => {
      res.send("Problem from threadController file");
    });
};
