const express = require("express"),
    http = require("http"),
    cors = require("cors"),
    path = require("path"),
    fs = require("fs"),
    static = require('serve-static'),
    expressErrorHandler = require('express-error-handler'),
    anxios = require("axios"),
    request = require("request"),
    ejs = require('ejs'),
    iconv = require('iconv-lite'),
    convert = require('xml-js'),
    { default: axios } = require("axios");

const app = express();

//const acaoUrl = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "http://openapi.11st.co.kr/openapi/OpenApiService.tmall";
const apiKey = "d31cb5254083f025e9231e22960e7e14";

app.set("port", process.env.PORT || 3000);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));
app.engine('html', require('ejs').renderFile);


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(static(path.join(__dirname, 'public')));

const router = express.Router();
app.use("/", router);

app.get("/", function (req, res) {
    res.render("index");
})

router.route("/products").post(async function (req, res) {
    console.log('/products 호출됨.');
    let keyword = req.body.keyword || req.query.keyword;

    let url = baseUrl
        + "?key=" + apiKey
        + "&apiCode=ProductSearch&keyword=" + keyword
        + "&pageSize=8";


    const data = await axios({
        url,
        method: "GET",
        responseType: "arraybuffer"
    });

    const xml = iconv.decode(data.data, "euc-kr");
    const productJSON = JSON.parse(convert.xml2json(xml, { compact: true, spaces: 4 }));
    const products = productJSON.ProductSearchResponse.Products["Product"];
    // console.log(xml);
    // console.log(products);

    let body = [];
    let html = "";
    for (idx in products) {
        //console.log(products[idx]["ProductName"]["_cdata"] +"\n");
        let options = {
            productCode: products[idx]["ProductCode"]._text,
            detailPageUrl: products[idx]["DetailPageUrl"]._cdata,
            productName: products[idx]["ProductName"]._cdata,
            productImg: products[idx]["ProductImage"]._cdata,
            productPrice: products[idx]["ProductPrice"]._text,
            seller: products[idx]["Seller"]._text,
            buySatisfy: products[idx]["BuySatisfy"]._text,
            rating: products[idx]["Rating"]._text,
            reviewCount: products[idx]["ReviewCount"]._text
        };
        // console.log(options);
        body.push(options);
    }


    res.render("products", body);
    // document.createElement('target').appendChild(html);
    // res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    // res.write(html);
    // res.end();
});

router.route("/products/:productCode").get(async function (req, res) {
    console.log('/products/:productCode 호출됨.');
    let productCode = req.body.productCode || req.query.productCode;
    let url = baseUrl
        + "?key=" + apiKey
        + "&apiCode=ProductInfo&productCode=" + productCode;

    const data = await axios({
        url,
        method: "GET",
        responseType: "arraybuffer"
    })
    const xml = iconv.decode(data.data, "euc-kr");
    const productJSON = JSON.parse(convert.xml2json(xml, { compact: true, spaces: 4 }));
    const product = productJSON.ProductInfoResponse;//.Product;
    // console.log("product 생성 완료");

    res.render("productInfo", product);
});

//error page 설정
let errorHandler = expressErrorHandler({
    static: {
        '404': './views/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});