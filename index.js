var express  = require("express"),
    app = express(),
    port = process.env.port || 3000,
    bodyParser = require("body-parser");

var todoRouter = require("./routes/toDos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", function(req, res) {
    res.sendfile("index.html")
});

app.use("/api/todos", todoRouter);



app.listen(port, function(){
    console.log("app is running!" + " " + port);
});