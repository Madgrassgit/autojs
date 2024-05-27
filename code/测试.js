var utils = require('utils.js');

//图片路径
var PIC_未读数N = "/sdcard/autojs/idlefish/未读数N.png";
var PIC_去发货 = "/sdcard/autojs/idlefish/去发货.png";
var PIC_无需寄件 = "/sdcard/autojs/idlefish/无需寄件.png";
var PIC_无需寄件确认 = "/sdcard/autojs/idlefish/无需寄件确认.png";
var PIC_订单交易中 = "/sdcard/autojs/idlefish/订单交易中.png";
var PIC_订单交易中关闭 = "/sdcard/autojs/idlefish/订单交易中关闭.png";
var PIC_联系买家 = "/sdcard/autojs/idlefish/联系买家.png";
var PIC_去评价 = "/sdcard/autojs/idlefish/去评价.png";
var PIC_评价编辑框 = "/sdcard/autojs/idlefish/评价编辑框.png";
var PIC_输入法工具箱 = "/sdcard/autojs/idlefish/输入法工具箱.png";
var PIC_输入法编辑 = "/sdcard/autojs/idlefish/输入法编辑.png";
var PIC_输入法粘贴 = "/sdcard/autojs/idlefish/输入法粘贴.png";
var PIC_评价详情退出 = "/sdcard/autojs/idlefish/评价详情退出.png";
if (!requestScreenCapture()) {
    console.log("请求截图失败");
    exit()
}
else{
    console.log("请求截图成功");
}

var 订单交易中 = false;
if(!desc("去评价").exists()){
    订单交易中 = utils.waitForPicCLick(PIC_订单交易中, 1000, 2, 0, 0, device.width, device.height/2);
}
utils.waitForPicCLick(PIC_去评价, 200, "forever", 0, 0, device.width, device.height);

utils.waitForPicCLick(PIC_评价详情退出, 200, "forever", 0, 0,  device.width, device.height/2);

if(订单交易中){
    sleep(1000)
    utils.waitForPicCLick(PIC_订单交易中关闭, 1000, 5, 0, 0, device.width, device.height);
}
