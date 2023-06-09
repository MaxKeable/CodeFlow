const router = require("express").Router();
const { Note } = require("../../models");
const withAuth = require("../../utils/auth");

// Create
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newNoteData = await Note.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newNoteData);
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
