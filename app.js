const key = "d31cb5254083f025e9231e22960e7e14";
var keyword = "인터넷 케이블 랜선";

const express = require("express"),
    http = require("http"),
    cors = require("cors"),
    path = require("path"),
    jsdom = require('jsdom'),
    //$ = require("jquery"), //(require("jsdom").jsdom().parentWindow),
    request = require("request"),
    iconv = require("iconv-lite");

const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('home.html')).window;
global.document = document;

const $ = jQuery = require('jquery')(window);

const router = express.Router();
const app = express();
app.set("port", process.env.PORT || 3000);
app.route("/ajax");
app.use(cors());
app.use("/", router);
app.use("/node_modules", express.static(path.join(__dirname, "/node_modules")));

$(document).ready(function () {
    console.log("ready");
    $("#search").on("click", function () {
        alert("click");
        $.ajax({
            method: "GET",
            datatype: "jsonp",
            url: "https://cors-anywhere.herokuapp.com/http://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=d31cb5254083f025e9231e22960e7e14&apiCode=ProductSearch&keyword="+keyword,
            data: {}
        }).done(function (msg) {
            var str = msg.document["ProductSearchResponse"]["Products"]["Product"][0]["ProductName"];
            $("p").append(msg);
            console.log(msg);
        });
let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
    
    if(this.readyState == 4 && this.status == 200){
    nodeValfunc( this ); // this == xhttp 
    }
}
xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=d31cb5254083f025e9231e22960e7e14&apiCode=ProductSearch&keyword=pen", true);
xhttp.send();

function nodeValfunc( xml ) { // ( xml ) 객체 넘겨받기
    let num, name;
    let txt, numtxt, xmlDoc;
    
    txt = numtxt = ""; // 빈 문자열로 초기화
    
    xmlDoc = xml.responseXML; 
    
    num = xmlDoc.getElementsByTagName("Product");
    name = xmlDoc.getElementsByTagName("ProductName");
    console.log(num.length);
    
    //for(i=0; i < num.length; i++){
        txt += num[0].childNodes[0].nodeValue + "\n";
        numtxt += name[0].childNodes[0].nodeValue + "\n";
        console.log(txt + numtxt);
    //}
    $("p").append(txt + numtxt);
    // 실행하면 번호와 이름이 p태그에 출력된다.
}
    })
})

router.route('/process/search').post(function (req, res) {
    console.log('/process/search 호출됨.');

    
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});