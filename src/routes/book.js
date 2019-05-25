const routes = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('mean-db',['books']);

routes.get('/', (req,res,next)=>{
  db.books.find((err, books)=> {
    if(err) return next(err);
    res.json(books);
  });
});

module.exports = routes;
