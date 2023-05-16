const User = require("./User");
const Note = require("./Note");
const CodeSnippet = require("./CodeSnippet");
const CodeConcept = require("./CodeConcept");

User.hasMany(Note, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Note.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(CodeSnippet, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

CodeSnippet.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(CodeConcept, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

CodeConcept.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Note, CodeSnippet, CodeConcept };
