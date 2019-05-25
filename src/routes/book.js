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
  db.books.findOne({_id: req.params.id},(err,books)=>{
    if(err) return next(err);
    res.json(books);
  });
});

routes.post('/add',(req,res,next)=>{
  const book = req.body;
  if(!book.title){
    res.status(400).json({
      err: 'Bad data'
    });
  } else {
    db.book.save(book, (err, task) =>{
      res.json(task);
    });
  }
});

module.exports = routes;
