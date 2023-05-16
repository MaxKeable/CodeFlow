const router = require("express").Router();
// Include all the models: User, Note, CodeSnippet
const { User, Note, CodeSnippet } = require("../../models");

// Get all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Note }, { model: CodeSnippet }],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single reader
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findBypk(req.params.id, {
      include: [{ model: Note }, { model: CodeSnippet }],
    });

    if (!userData) {
      res.status(404).json({ message: "No user found with that id!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
