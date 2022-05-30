// var express = require("express");
// var router = express.Router();
// module.exports = router;

$(document).ready(function () {
    console.log("ready");
    $('#btnSearch').click(function () {
        onClickSearch();
    });
});

const acaoUrl = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "http://openapi.11st.co.kr/openapi/OpenApiService.tmall";
const apiKey = "d31cb5254083f025e9231e22960e7e14";
let url;
let searchKeyword = "";
let html;
let body = [];


function onClickSearch(){
    searchKeyword = document.getElementById("searchKeyword").value;
    console.log(searchKeyword);
    body = [];
    url = acaoUrl + baseUrl
        + "?key=" + apiKey
        + "&apiCode=ProductSearch&keyword=" + searchKeyword
        + "&pageSize=5";
    let html = "";
    let data;
    $.ajax({
        method: "GET",
        datatype: "xml",
        url: url//"/products",
        //data: data,
            
    });
}
