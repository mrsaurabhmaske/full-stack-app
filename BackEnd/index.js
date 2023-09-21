const express = require("express");
const { connection } = require("./db.js");
const { userRouter } = require("./routes/user.route.js");
const { notesRouter } = require("./routes/note.route.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ msg: "This is HomePage" });
});

app.use("/users", userRouter);

app.use("/notes", notesRouter);

app.listen(7700, async () => {
  try {
    await connection;
    console.log("Connected to DB...Server is running on port 7700");
  } catch (error) {
    console.log("Error while connecting to Database", error);
  }
});
