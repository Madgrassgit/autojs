

var url = "http://www.tuling123.com/openapi/api";
var r = http.postJson(url, {
    key: "65458a5df537443b89b31f1c03202a80",
    info: "你好啊",
    userid: "1",
});
log(r.body.string());