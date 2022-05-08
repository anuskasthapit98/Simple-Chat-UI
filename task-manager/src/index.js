const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const messageRouter = require("./routers/message");
const auth = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(messageRouter);

app.listen(port, () => {
  console.log("Server is on port " + port);
});
