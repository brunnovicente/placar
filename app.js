const express = require('express');
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const bodyParser = require('body-parser');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const router = express.Router();

const app = express()
PORTA = 3005

app.use(session({
    secret: 'iambatman',
    resave: true,
    saveUninitialized: false,
}))
app.use(flash())

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})


//Handlbars - Teamplate
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    'helpers':{
        toString: function (valor){
            return String(valor);
        }
    }
}))
app.set('view engine', 'handlebars');

//Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Public
app.use(express.static(path.join(__dirname, 'public')))

const principal = require('./routes/principal');
app.use('/principal', principal);

const torneio = require('./routes/torneio');
app.use('/torneio', torneio);

const partida = require('./routes/partida');
app.use('/partida', partida);

const tempo = require('./routes/tempo');
app.use('/tempo', tempo);

app.get('/', (req, res) => {
    res.redirect('/principal');
})




app.listen(PORTA, ()=>{
    console.log('Servidor executando: http://localhost:'+PORTA);
})
