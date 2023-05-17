const router = require("express").Router();
const userRoutes = require("./userRoutes");
const noteRoutes = require("./noteRoutes");
const codeSnippetRoutes = require("./codeSnippetRoutes");

router.use("/users", userRoutes);
router.use("/notes", noteRoutes);
router.use("/codeSnippet", codeSnippetRoutes);

module.exports = router;
