class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  render() {
    return `
    <div id="${title}">
      <p>${title}</p>
      <p>${author}</p>
      <p>${pages}</p>
      <p>${read}</p>
    </div>
    `;
  }
}

class Library {
  Books;
  constructor() {
    this.Books = new Map();
  }

  addBook = function (book) {
    this.Books.set(book.title, book);
  };

  removeBook = function (title) {
    this.Books.delete(title);
  };

  render = function () {
    let result = '<div>';
    this.Books.forEach((value, key) => {
      result += value.render();
    });
    result += '</div>';
    return result;
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
  }
}

class NewBookButtonFactory {
  createNewBookButton() {
    const newBookButton = document.createElement('button');
    newBookButton.className = 'new-book-button';
    newBookButton.setAttribute('data-open-modal', true);
    newBookButton.innerText = '+';
  }
}

class FooterFactory {
  createFooter() {
    return ` <footer class="footer">
    <p>
      Copyright ©
      <script>
        document.write(new Date().getFullYear());
      </script>
      pdtru&nbsp;
      <a href="https://github.com/pdtru" target="_blank">
        <i class="fa-brands fa-github"></i>
      </a>
    </p>
  </footer>`;
  }
}

class ModalFactory {
  createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-container';
    const dialog = this.createDialog();
    const bookForm = this.createBookForm();
    const closeButton = this.createCloseButton();
    const titleInput = this.createInput('Title', 100);
    const authorInput = this.createInput('Author', 100);
    const pagesInput = this.createInput('Pages', 10000);
    const checkBox = this.createCheckBox();
    const addButton = this.createAddButton();
    modal.appendChild(dialog);
    dialog.appendChild(bookForm);
    bookForm.append(
      closeButton,
      titleInput,
      authorInput,
      pagesInput,
      checkBox,
      addButton
    );
    return modal;
  }

  createAddButton() {
    const addButton = document.createElement('button');
    addButton.className = 'add-book-button';
    addButton.addEventListener('click', () => {
      const book = new Book(title.value, author.value, pages.value, read.value);
      myLibrary.addBook(book);
      console.log(myLibrary.Books.get(title.value));
      title.value = null;
      author.value = null;
      pages.value = null;
      read.value = 'off';
      modal.close();
      cardContainer.innerHTML = myLibrary.render();
    });
    return addButton;
  }

  createCloseButton() {
    const closeButton = document.createElement('button');
    closeButton.setAttribute('data-close-modal', true);
    closeButton.className = 'close-modal-button';
    closeButton.innerText = 'x';
    return closeButton;
  }

  createBookForm() {
    const addBookForm = document.createElement('div');
    addBookForm.className = 'add-book-form';
    return addBookForm;
  }

  createDialog() {
    const dialog = document.createElement('dialog');
    dialog.className = 'modal';
    dialog.setAttribute('data-modal', true);
    return dialog;
  }

  createInput(placeholder, maxlength) {
    const title = document.createElement('input');
    title.className = 'input';
    title.setAttribute('type', 'text');
    title.setAttribute('placeholder', placeholder);
    title.setAttribute('required', true);
    title.setAttribute('maxlength', maxlength);
    return title;
  }

  createCheckBox() {
    const container = document.createElement('div');
    container.className = 'read-check-container';
    const label = document.createElement('label');
    label.innerText = 'Read';
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    container.appendChild(label);
    container.appendChild(input);
    return container;
  }
}

const myLibrary = new Library();
const modalFactory = new ModalFactory();
const body = document.body;
body.appendChild(modalFactory.createModal());
const cardContainer = document.getElementById('card-container');

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
