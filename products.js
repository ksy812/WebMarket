// var express = require("express");
// var router = express.Router();

// router.get("/:id", function(req, res){
// });
// module.exports = router;

const acaoUrl = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "http://openapi.11st.co.kr/openapi/OpenApiService.tmall";
const apiKey = "d31cb5254083f025e9231e22960e7e14";
let url;
let searchKeyword = "";
let body = [];

function onClickProduct(){

}

function onClickSearch(){
    searchKeyword = document.getElementById("searchKeyword").value;
    //console.log(searchKeyword);
    body = [];
    url = acaoUrl + baseUrl
        + "?key=" + apiKey
        + "&apiCode=ProductSearch&keyword=" + searchKeyword
        + "&pageSize=5";
    let html = "";
    $.ajax({
        method: "GET",
        datatype: "xml",
        url: url,
        success: function (xml) {
            $(xml).find("Product").each(function () {
                let options={
                    producUrl: $(this).find("DetailPageUrl").text(),
                    productName: $(this).find("ProductName").text(),
                    productImg:  $(this).find("ProductImage").text(),
                    productPrice: $(this).find("ProductPrice").text(),
                    productSeller: $(this).find("Seller").text(),
                    productRating: $(this).find("Rating").text()
                }
                body.push(options);
            });
            
            body.forEach(function(item){
                console.log(item);
                html += "<li><div>"
                //html += "<li><div>" // onclick=location.href='" + producUrl + "'
                    + "<h3>"+ item["productName"] + "</h3>"
                    + "<img src="+item["productImg"]+" alt='상품 이미지'>"
                    + "<p>" + item["productPrice"]
                    + "<p>" + item["productSeller"]
                    + "<p>" + item["productRating"]
                    + "<input type='button' value='상세설명' onClick='location.href=`"+ item["producUrl"]+"`" +"'/>"
                    + "</div></li>";
                $("#productList").html(html);
            })
        }
    });
}