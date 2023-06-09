const router = require("express").Router();
const { Module } = require("../../models");
const withAuth = require("../../utils/auth");

// Create

router.post("/", withAuth, async (req, res) => {
  try {
    console.log("successful response");
    console.log(req.body);
    const newModuleData = await Module.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newModuleData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const moduleData = await Module.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!moduleData) {
      res.status(404).json({ message: "No Module found with this id!" });
      return;
    }

    res.status(200).json(moduleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
