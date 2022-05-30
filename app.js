var express = require("express"),
    http = require("http"),
    cors = require("cors"),
    path = require("path"),
    fs = require("fs"),
    // bodyParser = require("body-parser"), //생략 가능
    static = require('serve-static'),
    expressErrorHandler = require('express-error-handler'),
    //XMLHttpRequest  = require("xhr2"),
    // jsdom = require('jsdom'),
    // $ = require("jquery"), //(require("jsdom").jsdom().parentWindow),
    request = require("request");

// var products = require("./products");
// var productInfo = require("./productInfo");

const router = express.Router();
const app = express();
app.set("port", process.env.PORT || 3000);
app.route("/ajax");
app.use(cors());
app.use("/", router);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(static(path.join(__dirname, 'public')));
app.use("/node_modules", express.static(path.join(__dirname, "/node_modules")));

// app.use("/products", products);
// app.use("/productInfo", productInfo);

app.get("/", function(req, res){
    res.render("index", {title:"express"});
    //res.sendFile(__dirname+'/index.html');
})

//**********/
router.route("/products/:productCode").get(function (req, res) {
    console.log('/products/:productCode 호출됨.');
    let productCode = req.params.productCode;
    const acaoUrl = "https://cors-anywhere.herokuapp.com/";
    const baseUrl = "http://openapi.11st.co.kr/openapi/OpenApiService.tmall";
    const apiKey = "d31cb5254083f025e9231e22960e7e14";
    let url= acaoUrl + baseUrl
    + "?key=" + apiKey
    + "&apiCode=ProductSearch&productCode" + productCode;
    console.log("node:"+productCode);
    
    res.writeHead("200", {"Content-Type":"text/html;"});
    fs.createReadStream("./public/productInfo.html").pipe(res);
});

//실행 될 일 Xx
router.route("/products").get(function (req, res) {
    console.log('/products 호출됨.');
});


let errorHandler = expressErrorHandler({
    static: {
      '404': './public/404.html'
    }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});