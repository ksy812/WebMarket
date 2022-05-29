// const apiKey = "d31cb5254083f025e9231e22960e7e14";
// var searchKeyword = "xnote";

var express = require("express"),
    http = require("http"),
    cors = require("cors"),
    path = require("path"),
    XMLHttpRequest  = require("xhr2"),
    fs = require("fs"),
    bodyParser = require("body-parser"), //생략 가능
    static = require('serve-static'),
    jsdom = require('jsdom'),
    //$ = require("jquery"), //(require("jsdom").jsdom().parentWindow),
    request = require("request"),
    iconv = require("iconv-lite");
const { fstat } = require("fs");

// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM("<!DOCTYPE html>index")).window;
// global.document = document;
// const $ = jQuery = require('jquery')(window);


const router = express.Router();
const app = express();
app.set("port", process.env.PORT || 3000);
// app.route("/ajax");
app.use(cors());
app.use("/", router);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(static(path.join(__dirname, 'public')));
// app.use("/node_modules", express.static(path.join(__dirname, "/node_modules")));



// router.route('/products').get(function (req, res) {
//     console.log('/products 호출됨.');
//     //searchKeyword = req.;
//     //searchKeyword = req.body.searchKeyword;
//     //console.log(searchKeyword);

//     res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//     res.write( "<h1>/products 내용</h1>");
// 	res.write("<p>왜 작동을 안할까??");
// });

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});