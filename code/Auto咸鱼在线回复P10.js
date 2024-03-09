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
var PIC_输入法关闭 = "/sdcard/autojs/idlefish/输入法关闭.png";
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
//循环查找未读消息
while(true){
    sleep(3000)
    descStartsWith("未读数").waitFor()
    var 未读联系人 = descStartsWith("未读数").findOne();
    var unMsgCount = 未读联系人.desc().replace("未读数", "")
    console.log("从'"+未读联系人.desc()+"'解析出，未读数："+unMsgCount)
    click(未读联系人.bounds().centerX(), 未读联系人.bounds().centerY())
    sleep(1003)
    if(desc("互动消息").exists()){
        console.log("是互动消息，退出")
        back();
        continue;
    }
    else if(desc("通知消息").exists()){
        console.log("是通知动消息")
        if(doEvaluate){
            var 联系买家 = desc("联系买家").findOne();
            联系买家.click()
            checkEvaluate()
            answerMsg("好用的话帮忙给个好评哦[比心][比心]")
            desc("返回").click();
            sleep(1010)
            desc("返回").click();
        }
        else{
            back();
        }
        
        continue;
    }
    else if(text("闲小蜜").exists()){
        console.log("是闲小蜜，退出")
        back();
        continue;
    }
    

    //p10
    depth(14).className("android.view.View").waitFor()
    var 消息列表 = depth(14).className("android.view.View").find();
    if(消息列表.empty()){
        console.log("未找到未读消息");
    }else{
        /**
         * 读取倒数unMsgCount数量的消息（未读消息）
         * 逐一操作：先点击输入框，然后回复
         */
        for(var i = 消息列表.length-unMsgCount; i < 消息列表.length; i++){
            isSendGood = false;
            var 消息 = 消息列表[i];
            console.log("消息：" + 消息.desc());


            var 回答= getAnswer(消息.desc())
            if(回答!=NO_REPLY){
                answerMsg(回答);
            }
            if(回答.includes("发货") && !isSendGood){
                utils.waitForPicCLick(PIC_输入法关闭, 1000, "forever", 0, 0, device.width, device.height);
                utils.waitForPicCLick(PIC_去发货, 1000, 5, 0, 0, device.width, device.height/2);
                utils.waitForPicCLick(PIC_无需寄件, 1000, 10, 0, 0, device.width, device.height/2);
                utils.waitForPicCLick(PIC_无需寄件确认, 1000, 5, 0, 0, device.width, device.height);
                isSendGood = true;
            }
        }
        
    }

    

    desc("返回").click()
    sleep(997)
    // if(!text("消息").exists()){
    //     back()
    //     sleep(500)
    //     // var 消息tab = text("消息").findOne();
    //     // click(消息tab.bounds().centerX(), 消息tab.bounds().centerY())
    // }
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
    sleep(1011);
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
    //utils.waitForPicStableCLick(PIC_输入法工具箱, 200, "forever", 0, 0, device.width, device.height);
    utils.waitForPicStableCLick(PIC_输入法编辑, 200, "forever", 0, 0, device.width, device.height);
    
    utils.waitForPicCLick(PIC_输入法粘贴, 200, "forever", 0, 0, device.width, device.height);
    desc("发送").click()
    sleep(490)
}

function getAnswer(ques){
    var res = NO_REPLY;
    try {
        if(null != ques){
            ques = ques.toLowerCase();
        }
        if(null == ques){
            res = NO_REPLY;
        }
        else if(((ques.includes("登录")||ques.includes("密码")||ques.includes("账号"))&&
        (ques.includes("不")||ques.includes("错")||ques.includes("无")||ques.includes("改")||ques.includes("过期")||ques.includes("失败")||ques.includes("没")))
        ||ques.includes("风险")||ques.includes("异常")||ques.includes("失效")||ques.includes("之前")||ques.includes("以前")||ques.includes("上次")||ques.includes("上回")||ques.includes("拍过")||ques.includes("重新")||ques.includes("还可以")||ques.includes("还能")||ques.includes("验证码")){
            res = "1.之前账号异常，新账号"+utils.getPhone()+" 密码aaaa99。本闲鱼号长期维护账号密码，关注闲鱼号成为粉丝，以后账号异常/遇到登录问题找我即可，百分百售后！[举杯][举杯]\n2.确认下账号密码有没有输错\n3.确认下载的官方APP-“麦德龙”，不是英文\"METRO\"那个";
        }
        else if(ques.includes("到期")||ques.includes("有效期")||ques.includes("永久")||ques.includes("多久")||ques.includes("一直")||ques.includes("年卡")
        ||ques.includes("一次")||ques.includes("1次")||ques.includes("午")||ques.includes("时间")||ques.includes("天")||ques.includes("现在")||ques.includes("马上")){
            res = "关注本闲鱼号，即可0.1元一直使用（一年以上），账号可以随时登录，也可以提前登录。关注闲鱼号，售后账号/密码变更或登录有问题找我即可";
        }
        else if((ques.includes("借用")||ques.includes("你的"))&&ques.includes("号")){
            res = "是的，用我的账号登录，跟自己开通199一样的";
        }
        else if((ques.includes("独")||ques.includes("个人"))&&ques.includes("号")){
            res = "不是单独/个人账号，直接用我的账号登录，跟自己开通199一样的";
        }
        else if((ques.includes("这样"))&&(ques.includes("行")||ques.includes("可以")||ques.includes("能")||ques.includes("对"))){
            res = "对的，进门和结帐出示会员码就行了";
        }
        else if(ques.includes("我完成了评价")){
            res = "感谢[比心][比心]";
        }
        else if(ques.includes("1毛")||ques.includes("一毛")||ques.includes("1元")||ques.includes("一元")
            ||ques.includes("1块")||ques.includes("1分")||ques.includes("一块")||ques.includes("一分")
            ||ques.includes("0.1")||ques.includes("0.01")){
            res = "是的，直接拍吧";
        }
        else if(ques.includes("本人")||ques.includes("带人")){
            res = "账号登录后可以带其他人进店，麦德龙不要求每人都有会员";
        }
        else if(ques.includes("进店")){
            res = "是的，进店需要出示会员码";
        }
        else if(ques.includes("京东")){
            res = "抱歉，不支持京东";
        }
        else if(ques.includes("小程序")||ques.includes("App")||ques.includes("APP")){
            res = "不支持小程序，因为需要发验证码绑定，还是麻烦下载官方APP-“麦德龙”，不是英文\"METRO\"那个哈";
        }
        else if(ques.includes("停车")){
            res = "结帐后问下收营员，如果需要绑定车牌则不能免费停车，否则让她给你[结账单]用于出口处登记车牌";
        }
        else if(ques.includes("券")){
            res = "优惠券都可用";
        }
        else if(ques.includes("电子卡")||ques.includes("绑定")){
            res = "可以用账号登录后绑定卡进行结帐";
        }
        else if(ques.includes("门店")||ques.includes("全国")||(ques.startsWith('在')&&ques.length<=3)||ques.includes("有人")||ques.includes("能用")||ques.includes("通用")||
            ques.includes("直接拍")||ques.includes("还有")||ques.includes("有吗")||ques.includes("怎么")||ques.includes("能用")||ques.includes("能不能")||
            ques.includes("你好")||ques.includes("您好")||ques.includes("可以")||ques.includes("现在有")||
            ques.includes("嗨")||ques.includes("哈喽")||ques.includes("hi")||ques.includes("hello")||ques.includes("Hi")||ques.includes("Hello")||ques.includes("nihao")){
                res = "在的，直接拍就行，线上线下全国通用的（PLUS会员），关注本闲鱼号，即可0.1元一直使用（一年以上），账号可以随时登录，拍下发账号和步骤给你" 
        }
        else if(ques.includes("PLUS")||ques.includes("plus")||ques.includes("Plus")||ques.includes("会员")){
            res = "是PLUS卡，放心！打开麦德龙APP，手机摇一摇，弹出PLUS会员卡；显示附属卡、PLUS会员有效期；有了它，享受会员价，进店、收营员结帐畅通无阻！";
        }
        else if(ques.includes("我已拍下")){
            res = NO_REPLY;
        }
        else if(ques.includes("我已付款")||ques.includes("记得及时发货")){
            if(isSendGood){
                res = NO_REPLY;
            }
            else{
                res = "发货：\n⏬麦德龙APP，切换到“密码登陆\n账："+utils.getPhone()+"\n密：aaaa99\n重要的事情说三遍:\n登陆APP后，一定要晃动一下手机，弹出黑卡就是PLUS会员卡（带附属卡三个字，带有效期）。有了它，进店、结账，畅通无阻！\n①线下人工→结账先出示会员码，出总价后工作人员扫你的手机支付。\n②线下自助→先用机器扫商品，再用登陆了会员的App首页扫结账码。\n③线上→留地址和您自己的电话，配送到家。\n本闲鱼号长期维护账号密码，关注闲鱼号成为粉丝，以后账号异常/遇到登录问题找我即可，百分百售后！[举杯][举杯]";
            }
        }
        else if(ques=="好"||ques.includes("好的")||ques.includes("好滴")||ques.includes("好嘞")||ques.includes("谢")||ques.includes("ok")||ques.includes("OK")||ques.includes("Ok")||ques.includes("好呢")||ques.includes("嗯")||
        ques.includes("好了")||ques.includes("行了")||ques.includes("关注啦")||ques.includes("关注了")||ques.includes("啦")||ques.includes("可以了")||ques.includes("成功")||ques.includes("已关注")||ques.includes("收到")){
            res = "[比心][比心]";
        }
        else{
            if(desc("去发货").exists()){

            }
        }
    }
    catch (error) {
        // 处理异常的代码
        console.error('捕获到异常：', error);
        res = NO_REPLY;
    } finally {
        // 无论是否发生异常，都会执行的代码
        console.log('getAnswer执行完毕');
    }
    return res;
}

