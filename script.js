
let dialog = {
  modal: document.querySelector("dialog"),
  form: document.getElementById('form'),
  closeButton: document.getElementById('close'),
  showButton: document.getElementById('addBook'),
  addListeners: function(){
    this.showButton.addEventListener("click", ()=> this.modal.showModal());
    this.closeButton.addEventListener("click", ()=> this.modal.close());
    form.addEventListener('submit', (e)=> {
          e.preventDefault()
          form = document.getElementById('form')
          let formData = new FormData(form)
          console.log(formData.get('read'))
          this.modal.close()

          addBookToLibrary(formData)
          displayBook()
      })
    
  }
  
}

dialog.addListeners()

const myLibrary = [];

function Book(form) {
    this.title = form.get('title')
    this.author = form.get('author')
    this.pages = form.get('pages')
    this.read = form.get('read')
}

function addBookToLibrary(form) {
    let newBook = new Book(form)
    myLibrary.push(newBook)
    // console.log(myLibrary)
}

function displayBook(){
    for (let i = 0; i < myLibrary.length; i++){
        console.log(myLibrary[i])

    }
}
