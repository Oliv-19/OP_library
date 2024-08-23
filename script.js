const dialog = document.querySelector("dialog");
const showButton = document.getElementById("addBook");
const closeButton = document.getElementById("close");
const saveButton = document.getElementById("save");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});




let title = document.getElementById('title')
let author = document.getElementById('author')
let pages = document.getElementById('pages')
let read = document.querySelector('input[name="read"]:checked');



saveButton.addEventListener('click', ()=>{
  // console.log(read.value)
  addBookToLibrary(title.value, author.value, pages.value, read)
  displayBook()
  
})

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
    // console.log(myLibrary)
}

function displayBook(){
    for (let i = 0; i < myLibrary.length; i++){
        console.log(myLibrary[i])

    }
}
