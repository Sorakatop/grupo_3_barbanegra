var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = 3300;

var indexRouter = require('./routes/indexRouter');


var usersRouter = require('./routes/users');


var app = express();


// view engine setup
app.set('views',__dirname + '/src/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('../public'));


/* Vistas renderizadas */


app.use('/', indexRouter)
app.use('/user', usersRouter)



app.get('/loginRegistro', (req, res) => {
  res.sendFile(path.join(__dirname,'./views/loginRegistro.html'))
})
app.get('/detalleProducto', (req, res) => {
  res.sendFile(path.join(__dirname,'./views/detalleProducto.html'))
})
/* CARRITO DE COMPRAS */
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname,'./views/product-car.html'))
})
app.get('/admin',(req, res) => {
  res.sendFile(path.join(__dirname, './views/admin.ejs'))
})


app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}\n http://localhost:${port}` ))

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  



  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;