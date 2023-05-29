const router = require("express").Router();
const { CodeSnippet } = require("../../models");
const withAuth = require("../../utils/auth");

// Create
router.post("/", withAuth, async (req, res) => {
  try {
    console.log("successful response");
    console.log(req.body);
    const newCodeSnippet = await CodeSnippet.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newCodeSnippet);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const codeSnippetData = await CodeSnippet.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!codeSnippetData) {
      res.status(404).json({ message: "No code snippet found with this id!" });
      return;
    }

    res.status(200).json(codeSnippetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
