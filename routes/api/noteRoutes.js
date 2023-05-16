const router = require("express").Router();
// Include all the models: User, Note, CodeSnippet
const { User, Note, CodeSnippet } = require("../../models");

// Get all notes
router.get("/", async (req, res) => {
  try {
    const noteData = await Note.findAll({
      include: [{ model: User }, { model: CodeSnippet }],
    });
    res.status(200).json(noteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single note
router.get("/:id", async (req, res) => {
  try {
    const noteData = await Note.findBypk(req.params.id, {
      include: [{ model: User }, { model: CodeSnippet }],
    });

    if (!noteData) {
      res.status(404).json({ message: "No note found with that id!" });
      return;
    }
    res.status(200).json(noteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post
router.post("/", async (req, res) => {
  try {
    const noteData = await Note.create(req.body);
    res.status(200).json(noteData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
