const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;


}

function addBookToLibrary(book) {
    const theBook = document.createElement("div");
    
}


const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const read = formData.get("read");
    const newBook = new Book(title, author, pages, read);
    
    form.reset();
    myLibrary.push(newBook);
    addBookToLibrary(newBook);

    console.dir(myLibrary);

})

// Will be used to have only one book selected at a time
// const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// checkboxes.forEach(checkbox => {
//   checkbox.addEventListener('change', () => {
//     if (checkbox.checked) {
//       checkboxes.forEach(otherCheckbox => {
//         if (otherCheckbox !== checkbox) {
//           otherCheckbox.checked = false;
//         }
//       });
//     }
//   });
// });