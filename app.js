class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.Books = new Map();
  }
  addBook = function (book) {
    this.Books.set(book.title, book);
  };

  removeBook = function (title) {
    this.Books.delete(title);
  };
}

const myLibrary = new Library();

const addBookButton = document.getElementById('add-book-button');
const openButton = document.querySelector('[data-open-modal]');
const closeButton = document.querySelector('[data-close-modal]');
const modal = document.querySelector('[data-modal]');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');

addBookButton.addEventListener('click', () => {
  const book = new Book(title.value, author.value, pages.value, read.value);
  myLibrary.addBook(book);
  console.log(myLibrary.Books.get(title.value));
  title.value = null;
  author.value = null;
  pages.value = null;
  read.value = false;
  modal.close();
});

openButton.addEventListener('click', () => {
  modal.showModal();
});

closeButton.addEventListener('click', () => {
  modal.close();
});

modal.addEventListener('click', (e) => {
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close();
  }
});
