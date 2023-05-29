const User = require("./User");
const Note = require("./Note");
const CodeSnippet = require("./CodeSnippet");
const Module = require("./Module");

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
User.hasMany(Module, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Module.belongsTo(User, {
  foreignKey: "user_id",
});
module.exports = { User, Note, CodeSnippet, Module };
