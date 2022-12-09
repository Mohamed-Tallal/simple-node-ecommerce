const  express  = require("express");
const  bodyParser  = require("body-parser");
const  path  = require("path");
const homeRouter = require("./routes/home.router")
const productRouter = require("./routes/product.router")
const authRouter = require("./routes/auth.router")
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const falsh = require('connect-flash'); 
const  app = express()



const STORE = new SessionStore({
    uri : "mongodb://localhost:27017/n-ecommerce" ,
    collection : 'sessions'
});

app.use(session({
    secret : 'ecommerce hash session data',
    saveUninitialized : false , 
    store : STORE
}));
app.use(falsh())

app.use(express.static(path.join(__dirname , 'assets')));
app.set('view engine' , 'ejs');
app.set('views', 'views'); // default name 





app.use(homeRouter);
app.use(productRouter)
app.use(authRouter)

app.listen(3000 , () => {
    console.log("server is listen in port 3000")
})