const router = require("express").Router();
const { CodeSnippet } = require("../../models");
const withAuth = require("../../utils/auth");

// Create
router.post("/", withAuth, async (req, res) => {
  try {
    const newCodeSnippet = await CodeSnippet.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newCodeSnippet);
  } catch (err) {
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

// // Get all code snippets
// router.get("/", withAuth, async (req, res) => {
//   try {
//     const codeSnippetData = await CodeSnippet.findAll({
//       include: [{ model: User }, { model: Note }],
//     });
//     res.status(200).json(codeSnippetData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Get a single code snippet
// router.get("/:id", withAuth, async (req, res) => {
//   try {
//     const codeSnippetData = await CodeSnippet.findBypk(req.params.id, {
//       include: [{ model: User }, { model: Note }],
//     });

//     if (!codeSnippetData) {
//       res.status(404).json({ message: "No code snippet found with that id!" });
//       return;
//     }
//     res.status(200).json(codeSnippetData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
