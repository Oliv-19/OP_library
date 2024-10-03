

myLibrary = [];


class Book{
  

  constructor(form, id) {
    this.title = form.get('title')
    this.author = form.get('author')
    this.pages = form.get('pages')
    this.read = form.get('read')
    this.book_id = id
  }

  addBookToLibrary() {
    myLibrary.push(this)
    this.displayBook(this)
  }

  displayBook(book){
    //console.log(book)
    let domBook =new DOMmanager
    domBook.createCardElem(book)
  }
  
  static delBook(b_id){
    let allBooks= document.querySelectorAll('.book')
    let myArray = Array.from(allBooks)
    myLibrary.forEach((value, i) => {
      
      if(value.book_id == b_id ){
        myLibrary.splice(i, 1)

      }
      //console.log(myLibrary)
    })

    myArray.find((value)=> {
      if (value.dataset.indexNumber == b_id){
        value.remove()
      }
      
    })

  }
}

// let formData = new FormData(dialog.form)
// console.log(new book(formData, dialog.id))
class dialog{
  dialogOBJ = {
      modal: document.querySelector("dialog"),
      form: document.getElementById('form'),
      closeButton: document.getElementById('close'),
      showButton: document.getElementById('addBook'),
      exampleBtn: document.querySelector('.exampleBtn'),
      id: 0,
  }
  
  addListeners(){
    this.dialogOBJ.showButton.addEventListener("click", ()=> this.dialogOBJ.modal.showModal());
    this.dialogOBJ.closeButton.addEventListener("click", ()=> {this.dialogOBJ.modal.close(); this.dialogOBJ.form.reset()});
    this.dialogOBJ.exampleBtn.addEventListener("click", ()=> {
      let inputs= this.dialogOBJ.form.getElementsByTagName("input");
      let elemsArr = Array.from(inputs)
      elemsArr.forEach((val) => {
        if(val.name=='read'){
          val.checked
          console.log(val)
        } else{
          val.value = val.placeholder.split(': ')[1]
        }
      })
      
    });

    this.dialogOBJ.form.addEventListener('submit', (e)=> {
      e.preventDefault()
      this.dialogOBJform = document.getElementById('form')
      let formData = new FormData(form)
      console.log(formData.get('read'))
      this.dialogOBJ.modal.close()
      this.dialogOBJ.form.reset()
      
      this.dialogOBJ.id++
      let newBook=new Book(formData, this.dialogOBJ.id)
      newBook.addBookToLibrary()
    })
    
  }
}
let dl = new dialog
dl.addListeners()






  // createBook(form, id){
  // let newBook = new Book(form, id)
  // addBookToLibrary(newBook)
//}


class DOMmanager{
  bookContainer = document.querySelector('.bookDisplay')
  
  createHtmlElems (tagName, value, classId){
    let elem= document.createElement(tagName)
    elem.className = classId
    if(tagName == 'img'){
      elem.src = value
    } else {
      elem.textContent= value
    }
    
    return elem
  }

  htmlElems(book){
      let b_title = this.createHtmlElems('h3',book.title, 'b_title')
      let b_icon = this.createHtmlElems('img',"https://images.freeimages.com/image/previews/4be/orange-book-icon-png-5694165.png?fmt=webp&h=350", 'b_icon')
      let b_author = this.createHtmlElems('h3',book.author, 'b_author')
      let b_pages = this.createHtmlElems('h3',book.pages, 'b_pages')
      let b_read = this.createHtmlElems('button',book.read, 'b_read')
      let b_delete = this.createHtmlElems('button','', 'b_delete')

      b_read.addEventListener('click', ()=> {
        if(b_read.textContent== 'Read'){
          book.read = 'To be read'
          b_read.textContent = book.read
        } else{
          book.read = 'Read'
          b_read.textContent= book.read
        }
      })
      b_delete.addEventListener('click', ()=> Book.delBook(book.book_id))

      let htmlElems= [b_title, b_icon, b_author, b_pages, b_read, b_delete]
      
      return htmlElems
    }

  createCardElem(book){
    let card = document.createElement('div');
    card.className= 'book'
    card.dataset.indexNumber = book.book_id ;


    this.htmlElems(book).forEach(elem => {
      
      card.appendChild(elem)


    });
    //console.log(this.htmlElems(book))
    this.bookContainer.prepend(card)
    // this.bookContainer.appendChild(card)
  }
}










