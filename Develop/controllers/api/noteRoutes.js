const router = require("express").Router();
// Include all the models: User, Note, CodeSnippet
const { User, Note, CodeSnippet } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all notes
router.get("/", withAuth, async (req, res) => {
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
router.get("/:id", withAuth, async (req, res) => {
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

// Create
router.post("/", withAuth, async (req, res) => {
  try {
    const noteData = await Note.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(noteData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const noteData = await Note.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!noteData) {
      res.status(404).json({ message: "No Note found with this id!" });
      return;
    }

    res.status(200).json(noteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
