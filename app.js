class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  render = () => {
    const bookContainer = document.createElement('div');
    bookContainer.className = 'book-container';
    bookContainer.id = this.title;
    const title = document.createElement('p');
    title.innerText = this.title;
    const author = document.createElement('p');
    author.innerText = this.author;
    const pages = document.createElement('p');
    pages.innerText = this.pages;
    const readLabel = document.createElement('span');
    readLabel.innerText = 'Read';
    const isRead = document.createElement('input');
    isRead.setAttribute('type', 'checkbox');

    bookContainer.append(title, author, pages, isRead, readLabel);
    return bookContainer;
  };
}

class Library {
  Books;
  library;
  constructor() {
    this.Books = new Map();
  }

  addBook = (book) => {
    this.Books.set(book.title, book);
    this.render();
  };

  removeBook = (title) => {
    this.Books.delete(title);
    this.render();
  };

  createLibrary = () => {
    this.library = document.createElement('div');
    this.library.className = 'library-container';
    return this.library;
  };

  render = () => {
    this.library.innerHTML = '';
    this.Books.forEach((value, key) => {
      this.library.appendChild(value.render());
    });
  };
}

class NavBarFactory {
  createNavBar() {
    const nav = document.createElement('nav');
    nav.className = 'nav-bar';
    const header = document.createElement('div');
    header.className = 'header';
    header.innerText = 'Library';
    nav.appendChild(header);
    return nav;
  }
}

class FooterFactory {
  createFooter() {
    const footerContainer = document.createElement('footer');
    footerContainer.className = 'footer';
    const footer = document.createElement('p');
    footer.innerHTML = 'Copyright © 2023 pdtru ';
    footerContainer.appendChild(footer);
    const github = document.createElement('a');
    github.href = 'https://github.com/pdtru';
    footer.appendChild(github);
    const githubIcon = document.createElement('i');
    githubIcon.className = 'fa-brands fa-github';
    github.appendChild(githubIcon);
    return footerContainer;
  }
}

class ModalFactory {
  modal;
  titleInput;
  authorInput;
  pagesInput;

  constructor() {
    this.modal = null;
    this.titleInput = null;
    this.authorInput = null;
    this.pagesInput = null;
  }

  createModal = () => {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    this.modal = this.createDialog();
    const bookForm = this.createBookForm();
    const closeButton = this.createCloseButton();
    this.titleInput = this.createInput('Title', 100, 'text');
    this.authorInput = this.createInput('Author', 100, 'text');
    this.pagesInput = this.createInput('Pages', 10000, 'number');
    const addButton = this.createAddButton();
    modalContainer.appendChild(this.modal);
    this.modal.appendChild(bookForm);
    bookForm.append(
      closeButton,
      this.titleInput,
      this.authorInput,
      this.pagesInput,
      addButton
    );

    this.modal.addEventListener('click', (e) => {
      const dialogDimensions = this.modal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        this.modal.close();
      }
    });
    return modalContainer;
  };

  createNewBookButton = () => {
    const newBookButtonContainer = document.createElement('div');
    newBookButtonContainer.className = 'new-book-button-container';
    const newBookButton = document.createElement('button');
    newBookButtonContainer.appendChild(newBookButton);
    newBookButton.className = 'new-book-button';
    newBookButton.setAttribute('data-open-modal', true);
    newBookButton.innerText = '+';
    newBookButton.addEventListener('click', () => {
      this.modal.showModal();
    });
    return newBookButtonContainer;
  };

  createAddButton = () => {
    const addButton = document.createElement('button');
    addButton.className = 'add-book-button';
    addButton.innerText = 'Add';
    addButton.addEventListener('click', this.createBook);
    return addButton;
  };

  createBook = () => {
    const book = new Book(
      this.titleInput.value,
      this.authorInput.value,
      this.pagesInput.value
    );
    myLibrary.addBook(book);
    this.titleInput.value = null;
    this.authorInput.value = null;
    this.pagesInput.value = null;

    this.modal.close();
  };

  createCloseButton = () => {
    const closeButton = document.createElement('button');
    closeButton.setAttribute('data-close-modal', true);
    closeButton.className = 'close-modal-button';
    closeButton.innerText = 'x';
    closeButton.addEventListener('click', () => {
      this.modal.close();
    });
    return closeButton;
  };

  createBookForm = () => {
    const addBookForm = document.createElement('div');
    addBookForm.className = 'add-book-form';
    return addBookForm;
  };

  createDialog = () => {
    const dialog = document.createElement('dialog');
    dialog.className = 'modal';
    dialog.setAttribute('data-modal', true);
    return dialog;
  };

  createInput = (placeholder, maxlength, inputType) => {
    const title = document.createElement('input');
    title.className = 'input';
    title.setAttribute('type', inputType);
    title.setAttribute('placeholder', placeholder);
    title.setAttribute('maxlength', maxlength);
    return title;
  };
}

const myLibrary = new Library();
const navBarFactory = new NavBarFactory();
const modalFactory = new ModalFactory();
const footerFactory = new FooterFactory();
const body = document.body;

body.appendChild(navBarFactory.createNavBar());
body.appendChild(myLibrary.createLibrary());
body.appendChild(modalFactory.createModal());
body.appendChild(modalFactory.createNewBookButton());
body.appendChild(footerFactory.createFooter());
