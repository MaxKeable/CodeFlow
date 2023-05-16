const router = require("express").Router();
// Include all the models: User, Note, CodeSnippet
const { User, Note, CodeSnippet } = require("../../models");

// Get all code snippets
router.get("/", async (req, res) => {
  try {
    const codeSnippetData = await CodeSnippet.findAll({
      include: [{ model: User }, { model: Note }],
    });
    res.status(200).json(codeSnippetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single code snippet
router.get("/:id", async (req, res) => {
  try {
    const codeSnippetData = await CodeSnippet.findBypk(req.params.id, {
      include: [{ model: User }, { model: Note }],
    });

    if (!codeSnippetData) {
      res.status(404).json({ message: "No code snippet found with that id!" });
      return;
    }
    res.status(200).json(codeSnippetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post
router.post("/", async (req, res) => {
  try {
    const codeSnippetData = await CodeSnippet.create(req.body);
    res.status(200).json(codeSnippetData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
