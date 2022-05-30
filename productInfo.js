const acaoUrl = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "http://openapi.11st.co.kr/openapi/OpenApiService.tmall";
const apiKey = "d31cb5254083f025e9231e22960e7e14";
let url;
let productCode = "1513916262";
let body = [];

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
            $(xml).find("Product").each(function () {
                let body = {
                    productCode: $(this).find("ProductCode").text(),
                    productName: $(this).find("ProductName").text(),
                    productPrice: $(this).find("ProductPrice").text(),
                    basicImg: $(this).find("BasicImage").text(),
                    seller: $(this).find("Seller").text(),
                    buySatisfy: $(this).find("BuySatisfy").text()
                    //rating: $(this).find("Rating").text(),
                    //reviewCount: $(this).find("ReviewCount").text()
                }
            });

            html += "";
            $("#productList").html(html);
        }
    });
}