
const   express = require("express"),
        http = require("http"),
        cors = require("cors"),
        path = require("path"),
        $ = require("jquery"),
        request = require("request"),
        iconv = require("iconv-lite");
// const {JSDOM} = require("jsdom");
// const {window} = new JSDOM("");
// const $ = require("jquery")(window);

const router = express.Router();
const app = express();
app.set("port", process.env.PORT || 3000);
app.use("/", router);
app.use(cors());
app.use("/node_modules", express.static(path.join(__dirname, "/node_modules")));


const key = "d31cb5254083f025e9231e22960e7e14";
var keyword = "케이블";


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

router.route('/process/search').post(function(req, res) {
	console.log('/process/search 호출됨.');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });