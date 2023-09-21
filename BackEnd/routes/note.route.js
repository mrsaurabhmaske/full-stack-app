const express = require("express");
const { NoteModel } = require("../model/notes.model.js");
const { auth } = require("../middlewares/auth.middleware.js");
const { UserModel } = require("../model/user.model.js");

const notesRouter = express.Router();

//Get to the Notes Page
notesRouter.get("/", async (req, res) => {
  res.status(200).send({ msg: "This is NotesPage" });
});

//To create a new Note
notesRouter.post("/create", auth, async (req, res) => {
  try {
    const { title, description, user } = req.body;
    const newNote = new NoteModel({
      title,
      description,
      createdByUsername: user.username,
      createdByEmail: user.email,
    });
    await newNote.save();
    res.status(200).send({ msg: "Note Created Successfully", note: newNote });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

notesRouter.get("/get", auth, async (req, res) => {
  try {
    const { email, username } = req.body.user;
    let allNotes = await NoteModel.find({ createdByEmail: email });
    res.status(200).send(
      allNotes.length
        ? {
            msg: `Here are all the notes for user ${username}`,
            notes: allNotes,
          }
        : { msg: `We couldn't find any notes created by: ${username}` }
    );
  } catch (error) {
    res.send({ msg: "Error while fetching notes", error: error });
  }
});

notesRouter.patch("/update/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedNote = await NoteModel.findByIdAndUpdate(id, {
      title,
      description,
    });
    res
      .status(200)
      .send({ msg: "Note Updated Successfully", note: updatedNote });
  } catch (error) {
    res.status(400).send({ error: error });
  }

  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedNote = await NoteModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res
      .status(200)
      .send({ msg: "Note Updated Successfully", Updated_Note: updatedNote });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Error while updating the Note!", error: error });
  }
});

notesRouter.delete("/delete/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    await NoteModel.findByIdAndDelete(id);
    res.status(200).send({ msg: "Note Deleted Successfully" });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Error while deleting the Note", error: error });
  }
});

module.exports = { notesRouter };
