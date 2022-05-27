
const   express = require("express"),
        http = require("http"),
        cors = require("cors"),
        path = require("path"),
        $ = require("jquery"), //(require("jsdom").jsdom().parentWindow),
        request = require("request"),
        iconv = require("iconv-lite");

const router = express.Router();
const app = express();
app.set("port", process.env.PORT || 3000);
app.use("/", router);

app.use(cors());
app.route("/ajax");
app.use("/node_modules", express.static(path.join(__dirname, "/node_modules")));


const key = "d31cb5254083f025e9231e22960e7e14";
var keyword = "케이블";

$(document).ready(function () {
    console.log("ready");
    $("#search").click(function () {
        alert("click");
        $.ajax({
            method: "GET",
            url: "https://cors-anywhere.herokuapp.com/http://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=d31cb5254083f025e9231e22960e7e14&apiCode=ProductSearch&keyword=xnote",
            data: {}
        }).done(function (msg) {
            console.log("test: " + msg);
            $("p").append(msg);
        });
    })
})


// $(document).ready(function(){
//     console.log("ready");
//     $(".search").on("click", function(){
//         $.ajax({
//             method: "GET",
//             url: "http://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=d31cb5254083f025e9231e22960e7e14&apiCode=ProductSearch&keyword=xnote",
//             data: {}
//         }).done(function(msg){
//             console.log("test: "+ msg);
//             $("p").append(msg);
//         });
//     })
// })
/*
$.ajax({
    method: "GET",
    url: "http://openapi.11st.co.kr/openapi/OpenApiService.tmall?key="
    + key +"&apiCode=ProductSearch&keyword="+ keyword,
    data: {
        // key: key,
        // apiCode: "ProductSearch",
        // keyword: keyword,
        // pageNum: 1
    }
}).done(function(msg){
    console.log("test: "+ msg);
});
*/
router.route('/process/search').post(function(req, res) {
	console.log('/process/search 호출됨.');
    
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });