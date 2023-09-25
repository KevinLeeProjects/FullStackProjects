const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books,null,4));
});

//Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const getIsbn = books[req.params.isbn];
  return res.status(300).json({message: getIsbn});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let result = [];
  for(let i = 1; i <= Object.keys(books).length; i++)
  {
    if(books[i]["author"] == req.params.author)
    {
      result.push(books[i])
    }
  }
  return res.status(300).json({message: result});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let result = [];
  for(let i = 1; i <= Object.keys(books).length; i++)
  {
    if(books[i]["title"] == req.params.title)
    {
      result.push(books[i])
    }
  }
  return res.status(300).json({message: result});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: books[req.params.isbn]["reviews"]});
});


//Improving the scope of Tasks 1-4 using Promises or Async-Await
//Task 10
let getListOfBooks = new Promise((resolve, reject) =>{
  resolve(books);
});

public_users.get('/',function (req, res) {
  //Write your code here
  getListOfBooks.then((successMessage) => {
    return res.send(`${successMessage} ${JSON.stringify(books,null,4)}`);
  })
});

//Task 11
function GetBook(book) {
  return new Promise((resolve, reject) => {
    if(book)
    {
      resolve(book);
    }
    else
    {
      reject(new Error("Book does not exist"));
    }
  })
}

public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const getIsbn = books[req.params.isbn];
  GetBook(getIsbn).then((successMessage) => {
    return res.status(300).json({message: successMessage});
  })
});


//Task 12
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let result = [];
  for(let i = 1; i <= Object.keys(books).length; i++)
  {
    if(books[i]["author"] == req.params.author)
    {
      result.push(books[i])
    }
  }
  GetBook(result).then((successMessage) => {
    return res.status(300).json({message: successMessage});
  })
});

//Task 13

public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let result = [];
  for(let i = 1; i <= Object.keys(books).length; i++)
  {
    if(books[i]["title"] == req.params.title)
    {
      result.push(books[i])
    }
  }
  GetBook(result).then((successMessage) => {
    return res.status(300).json({message: successMessage});
  });
});

module.exports.general = public_users;

