const routes = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('mean-db',['books']);

routes.get('/all', (req,res,next)=>{
  db.books.find((err, books)=> {
    if(err) return next(err);
    res.json(books);
  });
});

routes.get('/:id',(req,res,next)=> {
  db.books.findOne({_id: mongojs.ObjectId(req.params.id)},(err,books)=>{
    if(err) return next(err);
    res.json(books);
  });
});

// add
routes.post('/add',(req,res,next)=>{
  const book = req.body;
  // condicional
  if(!book.title){
    res.status(400).json({
      err: 'Bad data'
    });
// add the new book
  }else {
    db.book.save(book, (err, book) =>{
      if(err) return next(err);
      res.json(book);
    });
  }
});

routes.delete('/delete/:id', (req,res,next)=>{
  db.books.remove({_id: mongojs.ObjectId(req.params.id)}, (err,result)=>{
    if(err) return next(err);
    res.json(result);
      });
  });


routes.put('/actualizar/:id', (req,res,next)=>{
  const book = req.body;
  const updateBook = {};
  if(book.isDone) {
    updateBook.isDone = book.isDone;
  }
  if(book.title){
    updateBook.title = book.title;
  }

  if(!updateBook){
  res.status(400).json({
    error: 'Bad request'
        });
    }else{
  db.books.update({_id: mongojs.ObjectId(req.paramas.id)}, (err, book)=>{
    if(err) return next(err);
    res.json(book);
      });
    }
});

module.exports = routes;
