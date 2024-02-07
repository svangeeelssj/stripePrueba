const express = require('express');
const expbhs = require('express-handlebars');
const path = require('path');

//Inicializar express
const app = express();

//Configuracion
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.engine('.hbs', expbhs({

//}))

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Rutas
app.use(require('./routes/index'));

//Public
//app.set(express.static(path.join(__dirname, 'public')));
app.use(express.static('src/public'));
//Iniciar server
app.listen(3000, ()=> {
    console.log('Server en puerto', 3000);
})