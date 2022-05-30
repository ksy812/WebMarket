var express = require("express"),
    http = require("http"),
    cors = require("cors"),
    path = require("path"),
    httpMsgs = require("http-msgs"),

    bodyParser = require("body-parser"), //생략 가능
    static = require('serve-static'),
    //XMLHttpRequest  = require("xhr2"),
    //fs = require("fs"),
    // jsdom = require('jsdom'),
    // $ = require("jquery"), //(require("jsdom").jsdom().parentWindow),
    request = require("request");

// var products = require("./products");
// var productInfo = require("./productInfo");

/* const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM("<!DOCTYPE html>index")).window;
global.document = document;
const $ = jQuery = require('jquery')(window); */


const router = express.Router();
const app = express();
app.set("port", process.env.PORT || 3000);
// app.route("/products");
app.use(cors());
app.use("/", router);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(static(path.join(__dirname, 'public')));
app.use("/node_modules", express.static(path.join(__dirname, "/node_modules")));

// app.use("/products", products);
// app.use("/productInfo", productInfo);

app.get("/", function(req, res){
    res.sendFile(__dirname+'/index.html');
});

// app.post("/products", function(req, res){
//     let data = req.body;
//     console.log(data);
//     httpMsgs.sendJSON(req, res, {
//         from : "Server"
//     });
// });

router.get('*').get(function (req, res) {
    console.log('/products 호출됨.');
    let body = [];
    $(xml).find("Product").each(function () {
        let options={
            productCode: $(this).find("ProductCode").text(),
            detailPageUrl: $(this).find("DetailPageUrl").text(),
            productName: $(this).find("ProductName").text(),
            productImg:  $(this).find("ProductImage").text(),
            productPrice: $(this).find("ProductPrice").text(),
            seller: $(this).find("Seller").text(),
            buySatisfy: $(this).find("BuySatisfy").text()
            //rating: $(this).find("Rating").text(),
            //reviewCount: $(this).find("ReviewCount").text()
        }
        body.push(options);
    });
    html += "<div class='row' align='center'>";
    
                
    body.forEach(function(item){
        //console.log(item);
        url = acaoUrl + baseUrl
        + "?key=" + apiKey
        + "&apiCode=ProductSearch&productCode="+item["productCode"];
        console.log(url);

        html += "<div class='col-md-4'>"
            + "<p><strong>"+ item["productName"] + "</strong>"
            + "<br><img src="+item["productImg"]+" alt='상품 이미지'>"
            + "<p>" + item["productPrice"] +"원"
            + "<p>판매자 정보:" + item["seller"]
            + "<p>평점:" + item["buySatisfy"]
            + "<br>"
            +"<input type='button' value='상세설명' class='btn btn-secondary btn-sm' onClick='location.href=`"+ +"`" +"'/>"
            + "</div>";
       
    });
    html +="</div>"; //<hr></div>
    $("#productList").html(html);

});

// router.route('/product/:productCode').get(function (req, res) {
//     console.log('/product/:productCode 호출됨.');

// });
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});