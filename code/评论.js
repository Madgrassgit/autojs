var utils = require('utils.js');

if (!requestScreenCapture()) {
    console.log("请求截图失败");
    exit()
}
else{
    console.log("请求截图成功");
}
// click(110,116)
// sleep(100000)
var PIC_我的tab = "/sdcard/autojs/idlefish/我的tab.png";
var PIC_消息tab = "/sdcard/autojs/idlefish/消息tab.png";
var PIC_求小红花 = "/sdcard/autojs/idlefish/求小红花.png";
var PIC_联系买家 = "/sdcard/autojs/idlefish/联系买家.png";
var PIC_去评价 = "/sdcard/autojs/idlefish/去评价.png";
var PIC_订单交易中 = "/sdcard/autojs/idlefish/订单交易中.png";
var PIC_订单交易中关闭 = "/sdcard/autojs/idlefish/订单交易中关闭.png";
var PIC_评价编辑框 = "/sdcard/autojs/idlefish/评价编辑框.png";
var PIC_输入法工具箱 = "/sdcard/autojs/idlefish/输入法工具箱.png";
var PIC_输入法编辑 = "/sdcard/autojs/idlefish/输入法编辑.png";
var PIC_输入法粘贴 = "/sdcard/autojs/idlefish/输入法粘贴.png";
var PIC_评价详情退出 = "/sdcard/autojs/idlefish/评价详情退出.png";
var PIC_没有待评价宝贝 = "/sdcard/autojs/idlefish/没有待评价宝贝.png";
// var 我的tab = text("我的").findOne();
// click(我的tab.bounds().centerX(), 我的tab.bounds().centerY())
utils.waitForPicCLick(PIC_我的tab, 100, "forever", 0, 0,  device.width, device.height);
var 我的待办 = descContains("我的待办").findOne();
我的待办.click()
var 待评价 = textContains("待评价").findOne();
待评价.click()

/**
 * 循环点击 "待评价"
 */
while(true){    
    //查找图片"不存在待评价的宝贝"/"联系买家"，进行退出/去评价
    //var 不存在待评价宝贝 = isPicExist(PIC_没有待评价宝贝, 200, 10, device.width, device.height);
    let pics = [PIC_没有待评价宝贝, PIC_联系买家];
    var res = null;
    res = utils.waitForPics(pics, 100, 10, 0, 0, device.width, device.height);
    while(null == res){
        desc("返回").findOne().click();
        //sleep(1000)
        textContains("待评价").findOne().click()
        //sleep(1000)
        res = utils.waitForPics(pics, 500, 16, 0, 0, device.width, device.height);
    }

    /**
     * 存在待评价宝贝
     */
    if(res.index == 1){
        utils.waitForPicCLick(PIC_求小红花, 0, 1, 0, res.y-50, device.width, 100);
        sleep(1000)
        click(res.x, res.y)
        //waitForPicCLick(PIC_联系买家, 200, "forever", 0, 0, device.width, device.height/2);
        checkEvaluate()
        
        /**
         * 判断是不是自己的号
         */
        var 会员名 = className("android.widget.ImageView").descContains("会员名").findOnce();
        if(null==会员名){
            会员名 = className("android.view.View").descContains("会员名").findOnce();
        }
        if(null!=会员名){
            
            // var name = "";
            // if(会员名.desc().indexOf("买过你的宝贝") != -1){
            //     name = 会员名.desc().substring(会员名.desc().indexOf("买过你的宝贝")+7, 会员名.desc().indexOf("会员名")-1)
            // }
            // if(会员名.desc().indexOf("新粉") != -1){
            //     name = 会员名.desc().substring(会员名.desc().indexOf("新粉")+3, 会员名.desc().indexOf("会员名")-1)
            // }
            // else if(会员名.desc().indexOf("会员名") != -1){
            //     name = 会员名.desc().substring(0, 会员名.desc().indexOf("会员名")-1)
            // }
            // name = name.replace(/\d+/g, '')
            var name = 会员名.desc().substring(0, 会员名.desc().indexOf("会员名")-1)
            name = name.substring(name.lastIndexOf('\n')+1)
            if(会员名.desc().indexOf("韩语熙") == -1 && 会员名.desc().indexOf("麦德龙") == -1 && 会员名.desc().indexOf("西汉乐观的金桔") == -1){
                answerMsg(name + "亲亲好用的话帮忙给个好评哦[比心][比心]")
                answerMsg("本闲鱼号长期维护账号密码，关注闲鱼号成为粉丝，以后亲亲遇到账号异常/遇到登录问题找我即可，百分百售后！[举杯][举杯]")
            }
        }
        else{
            console.log("未找到会员名控件")
            answerMsg("亲亲好用的话帮忙给个好评哦[比心][比心]")
            answerMsg("本闲鱼号长期维护账号密码，关注闲鱼号成为粉丝，以后账号异常/遇到登录问题找我即可，百分百售后！[举杯][举杯]")
        }
        
        var 返回 = desc("返回").findOne()
        console.log("返回 待评价列表 findOne :" + desc("返回").exists())
        返回.click()
        //desc("返回").findOne().click();
    }
    else {
        sleep(1000)
        desc("返回").findOne().click();
        sleep(1000)
        back();
        // sleep(1000)
        // var 消息tab = text("消息").findOne();
        // click(消息tab.bounds().left, 消息tab.bounds().top)
        // console.log(消息tab.bounds().left+","+消息tab.bounds().top)
        var 消息tab = text("消息").findOne();
        sleep(500)
        click(消息tab.bounds().centerX(), 消息tab.bounds().centerY())
        break;
    }
    
}


/**
 * 单条回复
 * 点击输入框，粘贴回复消息确认
 * @param {回复} answer 
 */
 function answerMsg(answer){
    setClip(answer)
    var 说点什么 = className("android.view.View").descContains("说点什么").findOne();
    click(说点什么.bounds().centerX(), 说点什么.bounds().centerY())
    //p10
    utils.waitForPicStableCLick(PIC_输入法编辑, 100, "forever", 0, 0, device.width, device.height);
    utils.waitForPicCLick(PIC_输入法粘贴, 100, "forever", 0, 0,  device.width, device.height);
    desc("发送").click()
}
/**
 * 检查 去评价
 * 结束后回到聊天对话界面
 */
 function checkEvaluate(){
     //复制
    setClip("非常nice的买家，收货速度很快，沟通也很顺畅，爱了爱了~")
    //desc("去评价").waitFor()
    desc("去评价").findOne().click();
    // sleep(1000)

    var 订单交易中 = false;
    // if(!desc("去评价").exists()){
    //     订单交易中 = utils.waitForPicCLick(PIC_订单交易中, 1000, 2, 0, 0, device.width, device.height/2);
    //     utils.waitForPicCLick(PIC_去评价, 200, "forever", 0, 0, device.width, device.height);
    // }
    // else{
    //     desc("去评价").click();
    // }

    //desc("赏好评").waitFor()
    desc("赏好评").findOne().click();
    //编辑框
    utils.waitForPicStableCLick(PIC_评价编辑框, 100, "forever", 0, 0, device.width, device.height);
    
    //粘贴
    utils.waitForPicStableCLick(PIC_输入法编辑, 100, "forever", 0, 0, device.width, device.height);
    
    utils.waitForPicStableCLick(PIC_输入法粘贴, 100, "forever", 0, 0,  device.width, device.height);
    desc("发布").click()
    //sleep(3000)
    utils.waitForPicStableCLick(PIC_评价详情退出, 100, "forever", 0, 0,  device.width, device.height/2);
    sleep(1000)

    if(订单交易中){
        sleep(1000)
        utils.waitForPicCLick(PIC_订单交易中关闭, 1000, 5, 0, 0, device.width, device.height);
    }
}

