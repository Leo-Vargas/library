function Book (title, author, pages, read){
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

let myLibrary = [];

const addButton = document.getElementById('newBook')
const formWrap = document.getElementById('formWrap')
const addForm = document.getElementById('submitBook')
const libraryWrap = document.getElementById('libraryWrap')

addButton.addEventListener('click', () => {
  handleForm()
})

addForm.addEventListener('submit', getFormData)

function getFormData(e){
  const formData = new FormData(e.target)
  const read = formData.get('read') == 'read' ? true : false;
  e.preventDefault()

  handleForm()
  addBookToLibrary(formData.get('title'), formData.get('author'), formData.get('pages'), read)
  e.target.reset()
}

function handleForm(){
  formWrap.classList.toggle('hiddenForm')
  formWrap.classList.toggle('activeForm')
}

function addBookToLibrary(title, author, pages, read){
  const book = new Book(title, author, pages, read)
  myLibrary.push(book)
  displayBook(book, myLibrary.length)
}

function displayBook(book, number){
  const bookCardWrap = document.createElement('div');
  const bookCard = {
    title: document.createElement('div'),
    author: document.createElement('div'),
    pages: document.createElement('div'),
    read: document.createElement('button'),
    remove: document.createElement('button')
  }

  for(const property in book){

    if (property != 'read'){
      bookCard[property].innerText = book[property]
      bookCard[property].classList.add('cardText')
    } else{
      if (book[property]){
        bookCard[property].innerText = 'read'
        bookCard[property].classList.add('read')
      } else{
        bookCard[property].innerText = 'Not read'
        bookCard[property].classList.add('notRead')
      }
    }
    bookCardWrap.appendChild(bookCard[property])
  }

  bookCard.remove.innerText = 'Remove'
  bookCard.remove.classList.add('remove')
  bookCard.remove.addEventListener('click', removeCard)
  bookCardWrap.appendChild(bookCard.remove)


  libraryWrap.dataset.index = number;
  libraryWrap.appendChild(bookCardWrap)
}

function removeCard(e){
  e.target.parentElement.style.display = 'none'
  myLibrary.splice(e.target.dataset.index, 1)
}