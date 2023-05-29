const router = require("express").Router();
const userRoutes = require("./userRoutes");
const noteRoutes = require("./noteRoutes");
const codeSnippetRoutes = require("./codeSnippetRoutes");
const moduleRoutes = require("./moduleRoutes");

router.use("/users", userRoutes);
router.use("/notes", noteRoutes);
router.use("/codeSnippet", codeSnippetRoutes);
router.use("/modules", moduleRoutes);

module.exports = router;
