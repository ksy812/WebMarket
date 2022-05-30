const acaoUrl = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "http://openapi.11st.co.kr/openapi/OpenApiService.tmall";
const apiKey = "d31cb5254083f025e9231e22960e7e14";
let url;
let productCode = "1513916262";

function setProduct() {
    url = acaoUrl + baseUrl
        + "?key=" + apiKey
        + "&apiCode=ProductSearch&productCode" + productCode;
    let html = "";

    $.ajax({
        method: "GET",
        datatype: "xml",
        url: url,
        success: function (xml) {
            html += "<h2>"+$(xml).find("ProductCode").text()+"</h2>"
                +"<p><br>"+$(xml).find("ProductName").text()+"</br>"
                +"<p>"+$(xml).find("ProductPrice").text()
            $("#productList").html(html);
        }
    });
}