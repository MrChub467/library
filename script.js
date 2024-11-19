const myLibrary = [];
const shelf = document.querySelector(".shelf1");
const shelfHeight = shelf.getBoundingClientRect().height;
const shelfWidth = shelf.getBoundingClientRect().width;



function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;


}

function addBookToLibrary(book) {
    const width = getBookDimensions(book.pages);
    const shelf = doesBookFit(width);
    const theShelf = document.querySelector(shelf);
    console.log(width);
    console.log(shelf)
    
    
    const input = document.createElement("input");
    setAttributes(input, {"type": "radio", "name": "book", "id": "book"})
    theShelf.appendChild(input);

    const label = document.createElement("label");
    setAttributes(label, {"for": "book", "class": "book"})

    const spine = document.createElement("div");
    spine.classList.add("side", "spine");

    const title = document.createElement("span");
    title.classList.add("title");
    spine.appendChild(title);

    const author = document.createElement("span");    
    author.classList.add("author");
    spine.appendChild(author);
    label.appendChild(spine);
    
    const top = document.createElement("div");
    top.classList.add("side", "top");
    label.appendChild(top);

    const content = document.createElement("div");
    content.classList.add("side", "content");
    content.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit tempore repellat nulla autem numquam enim at. Accusamus, at exercitationem dicta, libero beatae, odio architecto consectetur sapiente temporibus recusandae deserunt illum?"
    label.appendChild(content);

    const cover = document.createElement("div");
    cover.classList.add("side", "cover");
    label.appendChild(cover);

    theShelf.appendChild(label);
    
}

function getBookDimensions(pages) {
    let width = 20
    //let height = (shelfHeight - 20) + "px";

    switch(true) {
        case pages > 500:
            width = 60;
            break;
        case pages > 400:
            width = 50;
            break;
        case pages > 300:
            width = 40;
            break;
        case pages > 200:
            width = 30;
            break;
    }

    return width;

}

function doesBookFit(bookWidth) {
    if (getShelfFill(".shelf1") + bookWidth < shelfWidth) {
        return ".shelf1"
    } else if (getShelfFill(".shelf2") + bookWidth < shelfWidth) {
        return ".shelf2"
    } else if (getShelfFill(".shelf3") + bookWidth < shelfWidth) {
        return ".shelf3"
    } else {
        return "Bookshelf Full"
    }
}

function getShelfFill(shelf) {
    let children = Array.from(document.querySelector(shelf).children);
    let totalWidth = 0;
    children.forEach(child => {
        totalWidth += child.getBoundingClientRect().width;
    });
    return totalWidth;
}

function setAttributes(element, attributes) {
    for(var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
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
    
    // form.reset();
    myLibrary.push(newBook);
    addBookToLibrary(newBook);

    console.dir(myLibrary);

})

// Need function to put the book back when clicked because it is a radio input

// Need to edit addBookToLibrary function to add the book to the screen
    // Function to get the size of the book given the number of pages
    // Set attributes function
    // Function to set a number to the elements for easy access
    // Function to check to see if a shelf if full, if it is go to the next one

// Maybe add a function to be able to drag books around

