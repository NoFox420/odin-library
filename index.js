const main = document.getElementById("main");
const booktitle = document.createElement("input");
const authorName = document.createElement("input");
const titleInputLabel = document.createElement("label");
const authorInputLabel = document.createElement("label");
const userPrompt = document.createElement("h1");
const formInput = document.createElement("form");
const submitButton = document.createElement("button");
const newBookButton = document.createElement("button");
const dialog = document.createElement("dialog");
const isReadLabel = document.createElement("label");
const numberOfDivs = document.getElementsByClassName("book");
const isReadToggle = document.createElement("button");
const isReadCheckbox = document.createElement("input");
let newBookTitle = "";
let newBookAuthor = "";
let book;
let readStatus = false;

const startingBook = new Book("StartingTitle", "StartingAuthor", 0);

const myLibrary = [startingBook];
let arrayIndex = myLibrary.length - 1;

// FIX UNWANTED BEHAVIOR IN  BOOK DIV WHEN MODAL OPENS

function Book(title, author, index, readStatus) {
  this.title = title;
  this.author = author;
  this.index = index;
  this.readStatus = readStatus;
}

const addInitialHTMLElements = () => {
  userPrompt.innerText = "Add a new Book!";
  formInput.setAttribute("action", "/");
  newBookButton.innerText = "Add a new Book";
  main.appendChild(newBookButton);
  isReadToggle.innerText = "Read Book?";
  isReadToggle.addEventListener("click", (event) => {
    event.preventDefault();
    readStatus = !readStatus;
    if (readStatus) {
      isReadCheckbox.checked = true;
    } else {
      isReadCheckbox.checked = false;
    }
  });
  isReadCheckbox.setAttribute("type", "checkbox");

  newBookButton.addEventListener("click", () => {
    submitNewBook();
  });
};

const submitNewBook = () => {
  main.appendChild(dialog);
  dialog.appendChild(userPrompt);
  dialog.appendChild(formInput);
  formInput.appendChild(titleInputLabel);
  formInput.appendChild(booktitle);
  formInput.appendChild(authorInputLabel);
  formInput.appendChild(authorName);
  formInput.appendChild(isReadToggle);
  formInput.appendChild(isReadCheckbox);
  formInput.appendChild(submitButton);
  dialog.showModal();
};

const addTitleHTML = () => {
  titleInputLabel.setAttribute("for", "booktitle");
  titleInputLabel.innerText = "Book Title";
  booktitle.setAttribute("type", "text");
  booktitle.setAttribute("id", "booktitle");
  booktitle.setAttribute("value", "");
};

const addAuthorHTML = () => {
  authorInputLabel.setAttribute("for", "authorname");
  authorInputLabel.innerText = "Book Author";
  authorName.setAttribute("type", "text");
  authorName.setAttribute("id", "authorname");
  authorName.setAttribute("value", "");
};

const addSubmitButtonHTML = () => {
  submitButton.innerText = "Submit";
  submitButton.setAttribute("value", "Submit");
  submitButton.addEventListener("click", (event) => {
    handleSubmit(event);
  });
};

const handleSubmit = (event) => {
  event.preventDefault();
  newBookTitle = booktitle.value;
  newBookAuthor = authorName.value;
  arrayIndex++;
  book = new Book(newBookTitle, newBookAuthor, arrayIndex);
  addBookToLibrary(book);
  resetInputValues();
  if (newBookTitle && newBookAuthor !== "") {
    addBooksToHTML();
    dialog.close();
    main.removeChild(dialog);
  } else {
    alert("Please enter a valid Title and Author!");
  }
};

const addBooksToHTML = () => {
  const bookElement = document.createElement("div");
  const title = document.createElement("h1");
  const author = document.createElement("p");
  const deleteButton = document.createElement("button");

  deleteButton.innerText = "Delete Book from Library";
  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    handleDelete(bookElement.id);
  });

  myLibrary.forEach((book) => {
    title.innerText = book.title;
    author.innerText = book.author;
    arrayIndex = numberOfDivs.length;
    bookElement.setAttribute("id", arrayIndex);
    bookElement.classList.add("book");
    bookElement.appendChild(title);
    bookElement.appendChild(author);
    bookElement.appendChild(isReadToggle);
    bookElement.appendChild(isReadCheckbox);
    bookElement.appendChild(deleteButton);
    main.appendChild(bookElement);
  });
};

const handleToggle = () => {
  const toToggle = document.getElementById("toCheck");
  toToggle.checked = !toToggle.checked;
  readStatus = !readStatus;
};

const addBookToLibrary = (book) => {
  myLibrary.push(book);
};

const resetInputValues = () => {
  booktitle.value = "";
  authorName.value = "";
};

const handleDelete = (index) => {
  myLibrary.splice(index, index + 1);
  let divToRemove = document.getElementById(index);
  main.removeChild(divToRemove);
};
addInitialHTMLElements();
addTitleHTML();
addAuthorHTML();
addSubmitButtonHTML();
addBooksToHTML();
