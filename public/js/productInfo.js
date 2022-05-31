// const acaoUrl = "https://cors-anywhere.herokuapp.com/";
// const baseUrl = "http://openapi.11st.co.kr/openapi/OpenApiService.tmall";
// const apiKey = "d31cb5254083f025e9231e22960e7e14";
// let url;
// let productCode;

// $(document).ready(function () {
//     console.log("productInfo ready");
//     productCode = "1179780064"; //코드 받아와야 함.

//     url = baseUrl
//         + "?key=" + apiKey
//         + "&apiCode=ProductInfo&productCode=" + productCode;
//     let html = "";
//     console.log("js:"+url);
//     $.ajax({
//         method: "GET",
//         datatype: "xml",
//         url: url,
//         success: function (xml) {
//             html="<h1>테스트</h1>";
//             // html += "<h2>"+$(xml).find("ProductCode").text()+"</h2>"
//             //     +"<p><br>"+$(xml).find("ProductName").text()+"</br>"
//             //     +"<p>"+$(xml).find("ProductPrice").text()
//             $("#description").html(html);
//         }
//     });
// });