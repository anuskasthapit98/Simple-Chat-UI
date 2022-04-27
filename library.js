const fs = require("fs");
const chalk = require("chalk");

// ADD new book function

const addBook = (title, author, subtitle) => {
  const books = loadBooks();
  const duplicates = books.find((book) => book.title === title);
  if (!duplicates) {
    books.push({
      title: title,
      author: author,
      subtitle: subtitle,
    });
    saveBook(books);
    console.log(chalk.green.inverse("---| New Book Added |---"));
  } else {
    console.log(chalk.red.inverse("---| Book Already Exists |---"));
  }
};

// Save book in JSON file
const saveBook = (books) => {
  const dataJSON = JSON.stringify(books);
  fs.writeFileSync("library.json", dataJSON);
};

// Load data from JSON file

const loadBooks = () => {
  try {
    const data = fs.readFileSync("library.json");
    const dataJSON = data.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

//Remove book from JSON file

const removeBooks = (title) => {
  const books = loadBooks();
  const findBook = books.filter((book) => book.title !== title);
  if (books.length > findBook.length) {
    saveBook(findBook);
    console.log(chalk.grey.inverse("---| " + title + " Removed |---"));
  } else {
    console.log(chalk.red.inverse("---| " + title + " Not Found |---"));
  }
};

//List all books in the JSON file

const listBooks = () => {
  const books = loadBooks();
  console.log(chalk.grey.inverse("--------| BOOKS IN THE LIBRARY |--------"));
  books.forEach((book) => {
    console.log(book.title);
  });
};

//Search books in the JSON file

const searchBook = (title) => {
  const books = loadBooks();
  const search = books.find((book) => book.title === title);
  if (search) {
    console.log(chalk.grey.inverse(search.title + " Found"));
  } else {
    console.log(chalk.red.inverse("---| Not Found |---"));
  }
};

const updateBook = (title, newTitle) => {
  const books = loadBooks();
  const findBook = books.find((book) => book.title === title);
  if (findBook) {
    findBook.title = newTitle;
    saveBook(books);
    console.log(chalk.green.inverse("---| Book Updated |---"));
  } else {
    console.log(chalk.red.inverse("---| Book Not Found |---"));
  }
};

module.exports = {
  addBook: addBook,
  removeBooks: removeBooks,
  listBooks: listBooks,
  searchBook: searchBook,
  updateBook: updateBook,
};
