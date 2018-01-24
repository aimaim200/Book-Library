//Book Constructor
function Book(title, author, isbn){
   this.title  = title;
   this.author = author;
   this.isbn   = isbn;
}

//UI Constructor
function UI(){}
// Add Book To List
UI.prototype.addBookToList = function(book){
   const list = document.getElementById('book-list');
   //Create  tr Element
   const row = document.createElement('tr');
   // Insert columns in the User interface

   row.innerHTML = ' <td> '+ book.title + '</td> <td> '+ book.author+'</td> <td> '+ book.isbn+'</td><td><a href="" class="Delete">X</a></td>';
      list.appendChild(row);
}

//Show Alert
 UI.prototype.showAlert = function(message, className){
   //Create Div
   const div = document.createElement('div');
   // Add Classes
   div.className = 'alert ${className}';
   // Add Text
   div.appendChild(document.createTextNode(message));
   // Get parent
   const container = document.querySelector('.container');
   // Get Form
   const form = document.querySelector('#book-form');
   // Insert Alert
   container.insertBefore(div, form);

   //Time Out after 3 seconds
   setTimeout(function(){
      document.querySelector('.alert').remove();
   }, 3000);
 }

// Delete Book
UI.prototype.deleteBook = function (target){
  if(target.className === 'delete'){
     target.parentElement.parentElement.remove();
  }
}
//  Clear Fields in the Form
UI.prototype.clearFields = function(){
   document.getElementById('title').value  = '';
   document.getElementById('author').value = '';
   document.getElementById('isbn').value   = '';
}


//Event Listeners for Add Book
document.getElementById('book-form').addEventListener('submit',
function(event){
    // Get Form Values
    const title  = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn   = document.getElementById('isbn').value;
    //console.log(title, author, isbn);
    // Instantiate Book
    const  book = new Book(title, author, isbn);
    //console.log(book);

    // Instantiate User Inteface
    const ui = new UI();

     // validate
     if(title === '' || author === '' || isbn === ''){
         // Error Alert
        ui.showAlert('Please fill in all fields', 'error')
     } else{
        // Add Book to LIst
        ui.addBookToList(book);

        // Show success
        ui.showAlert('Book Added!','success');
        //Clear Fields
        ui.clearFields();
     }
event.preventDefault();
});

// Event Listener for Delete
document.getElementById('book-list').addEventListener
   ('click', function(event){
     // Instantiate UI
     const ui = new UI();
      // Delete Book
     ui.deleteBook(e.target);

     // Show delete Message
     ui.showAlert('Book Removed!','success');
  event.preventDefault();
});
