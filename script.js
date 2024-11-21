const myLibrary = [];
const shelf = document.querySelector(".shelf1");
const shelfHeight = shelf.getBoundingClientRect().height;
const shelfWidth = shelf.getBoundingClientRect().width;
let isBookPulledOut = false;
let bookPulledOut;

Book.prototype = {
    changeColor: function() {
        if (this.read === "read") {
            this.spine.style.backgroundColor = `hsl(120 ${getRandomColor(50, 100)} ${getRandomColor(30, 75)})`;
        } else {
            this.spine.style.backgroundColor = `hsl(360 ${getRandomColor(50, 100)} ${getRandomColor(30, 75)})`;
        }
    }
    
 };

function getRandomColor(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.spine;
    this.btn;

}

function addBookToLibrary(book) {
    const width = getBookWidth(book.pages);
    const height = shelfHeight - 20;
    const shelf = doesBookFit(width);
    const theShelf = document.querySelector(shelf);   
    
    const input = document.createElement("input");
    setAttributes(input, {"type": "checkbox", "name": "book", "id": "book" + book.id})
    input.addEventListener("change", () => {
        checkForPulledOutBook("#" + input.id);
    });
    theShelf.appendChild(input);

    const label = document.createElement("label");
    setAttributes(label, {"for": "book" + book.id, "class": "book"})
    label.style.width = width + "px";
    label.style.height = height + "px";

    const spine = document.createElement("div");
    spine.classList.add("side", "spine");

    const title = document.createElement("span");
    title.classList.add("title");
    title.textContent = book.title;
    spine.appendChild(title);

    const author = document.createElement("span");    
    author.classList.add("author");
    author.textContent = book.author;
    spine.appendChild(author);
    book.spine = spine;
    book.changeColor();
    label.appendChild(spine);
    
    const top = document.createElement("div");
    top.classList.add("side", "top");
    label.appendChild(top);

    const content = document.createElement("div");
    content.classList.add("side", "content");
    content.innerHTML = `
        <div>Title - ${book.title} </div>
        <div>Author - ${book.author} </div>
        <div>Pages - ${book.pages} </div>

    `
    const btnContainer = document.createElement("div");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Book";
    removeBtn.classList.add("content-btn");
    removeBtn.addEventListener("click", () => {
        input.remove();
        label.remove();
        bookPulledOut = "";
        isBookPulledOut = false;
        // FIX REMOVE BOOK FROM ARRAY
    });
    const colorChangeBtn = document.createElement("button");
    this.btn = colorChangeBtn;
    colorChangeBtn.textContent = "Change Read";
    colorChangeBtn.classList.add("content-btn");
    colorChangeBtn.addEventListener("click", () => {
        if (book.read === "read") book.read = "not-read"
        else {book.read = "read"}
        book.changeColor();
    });
    btnContainer.appendChild(colorChangeBtn);
    btnContainer.appendChild(removeBtn)
    content.appendChild(btnContainer);
    label.appendChild(content);

    

    const cover = document.createElement("div");
    cover.classList.add("side", "cover");
    cover.style.left = width + "px";
    label.appendChild(cover);


    theShelf.appendChild(label);
    
}

//------ Only allows one book to be pulled out at once ------\\
function checkForPulledOutBook(id) {
    if (!isBookPulledOut) {
        isBookPulledOut = true;
        bookPulledOut = id;
    } else if (bookPulledOut === id) {
        isBookPulledOut = false;
        bookPulledOut = "";
    } else {
        document.querySelector(bookPulledOut).checked = false;
        bookPulledOut = id;
    }
}


function giveBookNumber() {
    if (myLibrary.length === 0) return 0;
    let foundId;
    for (let i = 0; i < myLibrary.length + 1; i++) {
        foundId = true;
        for (const book of myLibrary) {
            if (i === book.id) {
                foundId = false;
                break;
            }
        }
        if (foundId) return i;
    }
}

function getBookWidth(pages) {
    let width = 20

    switch(true) {
        case pages > 300:
            width = 40;
            break;
        case pages > 200:
            width = 30;
            break;
    }
    return width;
}

function getBookHeight(pages) {
    let height = shelfHeight;
    return height;
}

function doesBookFit(bookWidth) {
    if (getShelfFill(".shelf1") + bookWidth < shelfWidth - 40) {
        return ".shelf1"
    } else if (getShelfFill(".shelf2") + bookWidth < shelfWidth - 40) {
        return ".shelf2"
    } else if (getShelfFill(".shelf3") + bookWidth < shelfWidth - 40) {
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
    const idNumber = giveBookNumber();
    const newBook = new Book(title, author, pages, read, idNumber);
    
    // form.reset();
    myLibrary.push(newBook);
    addBookToLibrary(newBook);

    console.dir(myLibrary);

})


// Need to edit addBookToLibrary function to add the book to the screen
    // Function to get the size of the book given the number of pages



// Maybe add a function to be able to drag books around

