const router = require("express").Router();
const { Note, User, CodeSnippet, Module } = require("../models");
const withAuth = require("../utils/auth");

// router.get("/", async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const moduleData = await Module.findAll({
//       include: [
//         {
//           model: User,
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const modules = moduleData.map((module) => module.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render("modules", {
//       modules,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/modules/:id", async (req, res) => {
//   try {
//     const moduleData = await Module.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//         },
//       ],
//     });

//     const module = moduleData.get({ plain: true });

//     res.render("modules", {
//       ...module,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/", withAuth, async (req, res) => {
  try {
    const noteData = await Note.findAll({
      user_id: req.session.user_id,
    });
    console.log(noteData);
    const notes = noteData.map((m) => m.get({ plain: true }));
    console.log(notes);

    res.render("homepage", {
      // modules,
      // codes,
      notes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/notes/:id", async (req, res) => {
  try {
    const noteData = await Module.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });

    const note = noteData.get({ plain: true });

    res.render("homepage", {
      ...note,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/note/:id", async (req, res) => {
//   try {
//     const noteData = await Note.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           //   attributes: ["user_name"],
//         },
//       ],
//     });

//     const note = noteData.get({ plain: true });

//     res.render("note", {
//       ...note,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/codesnippets", async (req, res) => {
  const codesnippetData = await CodeSnippet.findAll({
    lean: true,
  });
  // const codesnippetData = await CodeSnippet.findAll({
  //   include: [
  //     {
  //       model: User,
  //       attributes: ["firstName", "lastName", "email"],
  //     },
  //   ],
  // })

  //const codesnippets = codesnippetData.get({ plain: true });
  const codesnippets = codesnippetData;

  console.log(codesnippets);

  //const debugInformation = "hi";

  res.render("codesnippet", {
    //codesnippets: [{ title: "Date formatting" }, { title: "Promise all" }],
    codesnippets,
    logged_in: req.session.logged_in,
  });
});

router.get("/codesnippets/:id", async (req, res) => {
  try {
    const codesnippetData = await CodeSnippet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });

    const codesnippet = codesnippetData.get({ plain: true });

    res.render("codesnippet", {
      ...codesnippet,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//user
router.get("/", withAuth, async (req, res) => {
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
    res.redirect("/homepage");
    return;
  }

  res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/homepage");
    return;
  }
  res.render("login");
});

router.get("/homepage", (req, res) => {
  res.render("homepage");
  // const logoURL = "../assets/codeFlowLogo.png";
  // res.render("homepage", { logoURL });
});

module.exports = router;
