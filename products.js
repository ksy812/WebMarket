// var express = require("express");
// var router = express.Router();

// router.get("/:id", function(req, res){

// });
// module.exports = router;

const acaoUrl = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "http://openapi.11st.co.kr/openapi/OpenApiService.tmall";
const apiKey = "d31cb5254083f025e9231e22960e7e14";
let searchKeyword = "";//"xnote";

/*
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM("<!DOCTYPE html>index")).window;
global.document = document;
const $ = jQuery = require('jquery')(window);

 $("#btnSearch").on("click", function () {
   
}); */



function test(){
    searchKeyword = document.getElementById("searchKeyword").value;
    console.log(searchKeyword);
    let url = acaoUrl + baseUrl
        + "?key=" + apiKey
        + "&apiCode=ProductSearch&keyword=" + searchKeyword;
    let html = "";
    $.ajax({
        method: "GET",
        datatype: "xml",
        url: url,
        success: function (xml) {
            $(xml).find("Product").each(function () {
                let producUrl = $(this).find("DetailPageUrl").text();
                let productName = $(this).find("ProductName").text();
                let productImg =  $(this).find("ProductImage").text();
                let productPrice = $(this).find("ProductPrice").text();
                let productSeller = $(this).find("Seller").text();
                let productRating = $(this).find("Rating").text();
                html += "<li><div onclick=location.href='" + producUrl + "'>"
                //html += "<li><div>" // onclick=location.href='" + producUrl + "'
                    + "<img src="+productImg+" alt='상품 이미지'>"
                    + "<h3>" + productName + "</h3>"
                    + "<p>" + productPrice
                    + "<p>" + productSeller
                    + "<p>" + productRating
                    + "<input type='button' value='상세설명' onClick='location.href=`"+ +producUrl+"`" +"'/>"
                    + "</div></li>";
                $("#productList").html(html);
            });
        }
    });
}