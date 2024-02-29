var utils = require('utils.js');

//图片路径
var PIC_未读数N = "/sdcard/autojs/idlefish/未读数N.png";
var PIC_去发货 = "/sdcard/autojs/idlefish/去发货.png";
var PIC_无需寄件 = "/sdcard/autojs/idlefish/无需寄件.png";
var PIC_无需寄件确认 = "/sdcard/autojs/idlefish/无需寄件确认.png";

var PIC_联系买家 = "/sdcard/autojs/idlefish/联系买家.png";
var PIC_评价编辑框 = "/sdcard/autojs/idlefish/评价编辑框.png";
var PIC_输入法工具箱 = "/sdcard/autojs/idlefish/输入法工具箱.png";
var PIC_输入法编辑 = "/sdcard/autojs/idlefish/输入法编辑.png";
var PIC_输入法粘贴 = "/sdcard/autojs/idlefish/输入法粘贴.png";
var PIC_评价详情退出 = "/sdcard/autojs/idlefish/评价详情退出.png";


//不需要回复
var NO_REPLY = "nothing_to_reply";
//是否进行点评
doEvaluate = false;
//是否已经发货
var isSendGood = false;
if (!requestScreenCapture()) {
    console.log("请求截图失败");
    exit()
}
else{
    console.log("请求截图成功");
}
//提交测试
var 说点什么 = className("android.view.View").descContains("说点什么").findOne();
    click(说点什么.bounds().centerX(), 说点什么.bounds().centerY())
    //sleep(1011);
    //P9
    // click(700,1100)
    // sleep(500)
    // click(700,1700)
    //p10
    // click(80,1100)
    // sleep(500)
    // click(150,1700)
    // sleep(500)
    // click(700,1700)
    // sleep(500)
    //utils.waitForPicCLick(PIC_输入法工具箱, 10, "forever", 0, 0, device.width, device.height);
    console.log(111)
    utils.waitForPicStableCLick(PIC_输入法工具箱, 500, "forever", 0, 0, device.width, device.height);
    console.log(222)
    
