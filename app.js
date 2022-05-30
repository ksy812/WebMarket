var express = require("express"),
    http = require("http"),
    cors = require("cors"),
    path = require("path"),
    axios = require("axios"),
    //XMLHttpRequest  = require("xhr2"),
    //fs = require("fs"),
    bodyParser = require("body-parser"), //생략 가능
    static = require('serve-static'),
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

const acaoUrl = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "http://openapi.11st.co.kr/openapi/OpenApiService.tmall";
const apiKey = "d31cb5254083f025e9231e22960e7e14";
let url;
let searchKeyword = "";
let body = [];


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
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<p>productCode</p>');
    res.end();
    //res.render("/products/"+productCode);
});

router.route("/products").get(function (req, res) {
    console.log('/products 호출됨.');


    searchKeyword = document.getElementById("searchKeyword").value;
    //console.log(searchKeyword);
    body = [];
    url = acaoUrl + baseUrl
        + "?key=" + apiKey
        + "&apiCode=ProductSearch&keyword=" + searchKeyword
        + "&pageSize=8";
    let html = "";

    axios({
        method: "GET",
        datatype: "xml",
        url: url,
      }).then(function(res){
        console.log(res);
      });

    /* $.ajax({
        method: "GET",
        datatype: "xml",
        url: url,
        success: function (xml) {
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
                url = acaoUrl + baseUrl
                + "?key=" + apiKey
                + "&apiCode=ProductSearch&productCode="+item["productCode"];
                //console.log(url);
                //console.log(item["detailPageUrl"]);
                //console.log("js:"+item["productCode"]);

                html += "<div class='col-md-4'>"
                    + "<p><strong>"+ item["productName"] + "</strong>"
                    + "<br><img src="+item["productImg"]+" alt='상품 이미지'>"
                    + "<p>" + item["productPrice"] +"원"
                    + "<p>판매자 정보:" + item["seller"]
                    + "<p>평점:" + item["buySatisfy"]
                    + "<br>"
                    +"<input type='button' value='상세설명' class='btn btn-secondary btn-sm' onClick='location.href=`products/"+
                        item["productCode"] +"`'/>"
                    // +"<input type='button' value='상세설명' class='btn btn-secondary btn-sm' onClick='location.href=`products/"+
                    // + item["detailPageUrl"] +"`'/>"
                    + "</div>";
               
            });
            html +="</div>"; //<hr></div>
            $("#productList").html(html);
        }
    }); */


});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});