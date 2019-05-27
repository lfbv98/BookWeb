const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bookRoutes = require('./routes/book');
const indexRoutes = require('./routes/index');

// setting
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');

//middlewares
app.use(cors());
app.use(express.json());

// routes
app.use(indexRoutes);
app.use('/book',bookRoutes);

// listen
app.listen(port,()=>{
  console.log('Server corriendo en :'+port);
});
