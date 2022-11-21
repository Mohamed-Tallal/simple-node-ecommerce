const  express  = require("express");
const  bodyParser  = require("body-parser");
const bodyParserMW = bodyParser.urlencoded({extended: true});
const  path  = require("path");
const homeRouter = require("./routes/home.router")
const  app = express()

app.use(express.static(path.join(__dirname , 'assets')));
app.set('view engine' , 'ejs');
app.set('views', 'views'); // default name 






app.use(homeRouter);

app.listen(3000 , () => {
    console.log("server is listen in port 3000")
})