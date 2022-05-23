const express = require("express");
require("./db/mongoose");
const { decode } = require("../src/middleware/auth");
const postRouter = require("./routers/post");
const commentRouter = require("./routers/comments");
const userRouter = require("./routers/users");
const indexRouter = require("./routers/index");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/posts",decode, postRouter);
app.use("/comments",decode, commentRouter);
app.use("/user",userRouter);
app.use("/",indexRouter);

app.listen(port, () => {
  console.log("Server is on port " + port);
});
