const  express  = require("express");
const  bodyParser  = require("body-parser");
const  path  = require("path");
const homeRouter = require("./routes/home.router")
const productRouter = require("./routes/product.router")
const authRouter = require("./routes/auth.router")
const  app = express()

app.use(express.static(path.join(__dirname , 'assets')));
app.set('view engine' , 'ejs');
app.set('views', 'views'); // default name 






app.use(homeRouter);
app.use(productRouter)
app.use(authRouter)

app.listen(3000 , () => {
    console.log("server is listen in port 3000")
})