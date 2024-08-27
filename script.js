
let dialog = {
  modal: document.querySelector("dialog"),
  form: document.getElementById('form'),
  closeButton: document.getElementById('close'),
  showButton: document.getElementById('addBook'),
  id: 0,
  addListeners: function(){
    this.showButton.addEventListener("click", ()=> this.modal.showModal());
    this.closeButton.addEventListener("click", ()=> this.modal.close());
    form.addEventListener('submit', (e)=> {
          e.preventDefault()
          form = document.getElementById('form')
          let formData = new FormData(form)
          console.log(formData.get('read'))
          this.modal.close()
          
          this.id++
          createBook(formData, this.id)
          
      })
    
  }
  
}



dialog.addListeners()

let myLibrary = [];

function Book(form, id) {
    this.title = form.get('title')
    this.author = form.get('author')
    this.pages = form.get('pages')
    this.read = form.get('read')
    this.book_id = id

}

function createBook(form, id){
  let newBook = new Book(form, id)
  addBookToLibrary(newBook)
}


function addBookToLibrary(newBook) {
    myLibrary.push(newBook)
    displayBook(newBook)
    // console.log(myLibrary)
}

let bookCard = {
  bookContainer: document.querySelector('.bookDisplay'),

  createHtmlElems:function (tagName, value, classId){
    elem= document.createElement(tagName)
    elem.classname = classId
    elem.textContent= value
    return elem
  },

  htmlElems: function (book){
      let b_title = this.createHtmlElems('h3',book.title, 'b_title')
      let b_author = this.createHtmlElems('h3',book.author, 'b_author')
      let b_pages = this.createHtmlElems('h3',book.pages, 'b_pages')
      let b_read = this.createHtmlElems('h3',book.read, 'b_read')
      
      let htmlElems= [b_title, b_author, b_pages, b_read]
      
      return htmlElems
    },

  createCardElem: function(book){
    let card = document.createElement('div');
    card.className= 'book'
    card.dataset.indexNumber = book.book_id ;

    this.htmlElems(book).forEach(elem => {
      console.log(elem)
      card.appendChild(elem)
    });
    //console.log(this.htmlElems(book))
    this.bookContainer.appendChild(card)
    

  }
}

function displayBook(book){
  console.log(book)
  bookCard.createCardElem(book)
 
  

    // for (let i = 0; i < myLibrary.length; i++){
    //     console.log(myLibrary)
    //     bookCard.createCardElem(myLibrary)
    // }
}
