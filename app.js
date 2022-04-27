// const validator = require('validator')
const chalk = require("chalk");
const yargs = require("yargs");
const library = require("./library");

// Create add command

yargs.command({
  command: "add",
  describe: "Add a new book",
  builder: {
    title: {
      describe: "Book Title",
      demandOption: true,
      type: "string",
    },

    author: {
      describe: "Author",
      demandOption: true,
      type: "string",
    },
    subtitle: {
      describe: "Book SubTitle",
      type: "string",
    },
  },

  handler(argv) {
    library.addBook(argv.title, argv.author, argv.subtitle);
  },
});

// Create remove command

yargs.command({
  command: "remove",
  describe: "Remove a book",
  builder: {
    title: {
      describe: "Book Title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    library.removeBooks(argv.title);
  },
});

// Create list command

yargs.command({
  command: "list",
  describe: "List books",
  handler(argv) {
    library.listBooks(argv.title);
  },
});

// Create search command

yargs.command({
  command: "search",
  describe: "Search a book",
  builder: {
    title: {
      describe: "Book Title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    library.searchBook(argv.title);
  },
});

// Create update command

yargs.command({
  command: "update",
  describe: "update a book",
  builder: {
    title: {
      describe: "Book Title",
      demandOption: true,
      type: "string",
    },
    newTitle: {
      describe: "Book Title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    library.updateBook(argv.title, argv.newTitle);
  },
});

console.log(yargs.argv);
