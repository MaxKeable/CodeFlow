const router = require("express").Router();
const { Note, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const noteData = await Note.findAll({
      include: [
        {
          model: User,
          //   attributes: ["user_name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const notes = noteData.map((note) => note.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      notes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/note/:id", async (req, res) => {
  try {
    const noteData = await Note.findByPk(req.params.id, {
      include: [
        {
          model: User,
          //   attributes: ["user_name"],
        },
      ],
    });

    const note = noteData.get({ plain: true });

    res.render("note", {
      ...note,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/note", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: User }],
    });

    const user = userData.get({ plain: true });

    res.render("note", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/note");
    return;
  }

  res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/note");
    return;
  }
  res.render("login");
});

router.get("/homepage", (req, res) => {
  res.render("homepage");
});

module.exports = router;
