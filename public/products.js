// var express = require("express");
// var router = express.Router();
// module.exports = router;


const acaoUrl = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "http://openapi.11st.co.kr/openapi/OpenApiService.tmall";
const apiKey = "d31cb5254083f025e9231e22960e7e14";
let url;
let searchKeyword = "";
let body = [];


function onClickSearch(){
    searchKeyword = document.getElementById("searchKeyword").value;
    //console.log(searchKeyword);
    body = [];
    url = acaoUrl + baseUrl
        + "?key=" + apiKey
        + "&apiCode=ProductSearch&keyword=" + searchKeyword
        + "&pageSize=8";
    let html = "";

    $.ajax({
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
        }
    });
}

function onClickProduct(){

}