

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
    let domBook =new CreateCards
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




class DOMmanager{
  nav= document.querySelector('nav')
  modal= this.nav.children[1]
  form= this.modal.children[0]
  showButton= this.nav.children[2].children[0]

  closeButton= this.form.children.namedItem('close')
  exampleBtn= this.form.children.namedItem('exampleBtn')
  id= 0
  getExample(){
    let inputs= this.form.getElementsByTagName("input");
    let elemsArr = Array.from(inputs)

    elemsArr.forEach((val) => {
      if(val.name=='read'){
        val.checked
        console.log(val)
      } else{
        val.value = val.placeholder.split(': ')[1]
      }
    })
  }

  formManager(e){
      e.preventDefault()
      this.form = document.getElementById('form')
      let formData = new FormData(form)
      console.log(formData.get('read'))
      this.modal.close()
      this.form.reset()
      
      this.id++
      let newBook=new Book(formData, this.id)
      newBook.addBookToLibrary()
  }
  addListeners(){
    console.log()

    this.showButton.addEventListener("click", ()=> this.modal.showModal());
    this.closeButton.addEventListener("click", ()=> {this.modal.close(); this.form.reset()});
    this.exampleBtn.addEventListener("click", ()=> {this.getExample()});

    this.form.addEventListener('submit', (e)=> {this.formManager(e)})
    
  }
}
let dl = new DOMmanager
dl.addListeners()






  // createBook(form, id){
  // let newBook = new Book(form, id)
  // addBookToLibrary(newBook)
//}


class CreateCards{
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










