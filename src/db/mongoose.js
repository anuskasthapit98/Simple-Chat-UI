const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  function(err) {
    if (err) return console.error(err);
  },
});
