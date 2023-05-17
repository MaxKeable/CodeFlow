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

// Get a single User
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
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

// Create a user, if successful, send the created user data as a JSON responses
// if error, send 400 (bad request) and errors as a json response
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Link sign-up form to MySQL database
router.post("/signup", async (req, res) => {
  try {
    const { name, password } = req.body;
    const newUser = await User.create({ name, password });
    res.status(200).json(newUser, { message: "Created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to create user" });
  }
});

// Link login form to MySQL databse
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ where: { name } });

    if (user && user.password === password) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Failed to login" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
