var utils = require('utils.js');
sleep(5000)
//device.wakeUp()
device.keepScreenOn()
var w = floaty.rawWindow(
    //ee000000，黑色透一点，前两位为透明度，ff完全看不见会导致寻图失败
    <frame gravity="center" bg="#ee000000">
      
    </frame>
);
w.setSize(1100, 2000);
w.setPosition(0, -100);
w.setTouchable(false);

setTimeout(()=>{
    w.close();
}, 54000*1000);


//图片路径
var PIC_消息tab = "/sdcard/autojs/idlefish/消息tab.png";
var PIC_未读数N = "/sdcard/autojs/idlefish/未读数N.png";
var PIC_去发货 = "/sdcard/autojs/idlefish/去发货.png";
var PIC_订单交易中 = "/sdcard/autojs/idlefish/订单交易中.png";
var PIC_订单交易中关闭 = "/sdcard/autojs/idlefish/订单交易中关闭.png";
var PIC_订单交易中去发货 = "/sdcard/autojs/idlefish/订单交易中去发货.png";
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
//是否需要点击发货
var needSendGood = false;
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
    
    try{
        //处理正常消息
        depth(14).className("android.view.View").waitFor()
        var 消息列表 = depth(14).className("android.view.View").find();
        if(消息列表.empty()){
            console.log("未找到未读消息");
        }else{
            let 消息筛选 = [];
            for(var i = 0; i < 消息列表.length; i++){
                var 消息TEMP = 消息列表[i];   
                var tempx = 消息TEMP.bounds().left;           
                if(tempx==195 || tempx==130){
                    消息筛选.push(消息TEMP);
                }
            }
            console.log("消息筛选="+消息筛选.length)
            /**
             * 读取倒数unMsgCount数量的消息（未读消息）
             * 逐一操作：先点击输入框，然后回复
             */
            for(var i = 消息筛选.length-unMsgCount; i < 消息筛选.length; i++){
                needSendGood = false;
                var 消息 = 消息筛选[i];
                console.log("消息：" + 消息.desc());


                var 回答list = getAnswer(消息.desc())
                console.log("回答list.length"+回答list.length);
                for (let j = 0; j < 回答list.length; j++) {
                    console.log("回答list"+j+":"+回答list[j]);
                }
                for (let j = 0; j < 回答list.length; j++) {
                    var 回答 = 回答list[j];
                    if(回答!=NO_REPLY){
                        answerMsg(回答);
                    }
                    /**
                     * 回答完所有回复在点击发货
                     */
                    if((j==回答list.length-1) && needSendGood){
                        utils.waitForPicCLick(PIC_输入法关闭, 1000, "forever", 0, 0, device.width, device.height);
                        var 订单交易中 = false;
                        if(!utils.isPicExist(PIC_去发货, 1000, 3, device.width, device.height/2)){
                            订单交易中 = utils.waitForPicCLick(PIC_订单交易中, 1000, 2, 0, 0, device.width, device.height/2);
                            utils.waitForPicCLick(PIC_订单交易中去发货, 1000, 5, 0, 0, device.width, device.height);
                        }
                        else{
                            utils.waitForPicCLick(PIC_去发货, 1000, 5, 0, 0, device.width, device.height);
                        }

                        utils.waitForPicCLick(PIC_无需寄件, 1000, 10, 0, 0, device.width, device.height/2);
                        utils.waitForPicStableCLick(PIC_无需寄件确认, 1000, 5, 0, 0, device.width, device.height);
                        console.log("订单交易中:"+订单交易中)
                        if(订单交易中){
                            sleep(3000)
                            utils.waitForPicCLick(PIC_订单交易中关闭, 1000, 5, 0, 0, device.width, device.height);
                        }
                    }
                }
                
            }
            
        }
    }
    catch (error) {
        // 处理异常的代码
        console.error('读取/回复消息捕获到异常：', error);
        res = NO_REPLY;
    } finally {
        // 无论是否发生异常，都会执行的代码
        console.log('读取/回复消息完成，回消息tab主页');
    }

    /**
     * 有时发货后返回点击之后还停留在聊天页面
     */
    if(needSendGood){
        sleep(1054)
    }
    desc("返回").click()
    sleep(501)

    while(!utils.isPicExist(PIC_消息tab, 500, 2, device.width, device.height)){
        if(desc("返回").exists()){
            desc("返回").click()
            sleep(1001)
        }
        else{
            console.log('未回消息tab主页，但也没有回退按钮');
            break;
        }
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
    sleep(1011);

    utils.waitForPicStableCLick(PIC_输入法编辑, 200, "forever", 0, 0, device.width, device.height);
    utils.waitForPicCLick(PIC_输入法粘贴, 200, "forever", 0, 0, device.width, device.height);
    desc("发送").click()
    sleep(490)
}

/**
 * 根据单个问题，组织回答
 * @param {} ques 
 * @returns 
 */
function getAnswer(ques){
    var 回答list = []; // 创建空回答list
    try {
        if(null != ques){
            ques = ques.toLowerCase();
        }
        if(null == ques || ques.includes("1.之前账号异常") || ques.includes("重要的事情说三遍") || ques.includes("本闲鱼长期维护") || ques.includes("帮忙给个好评")||ques.includes("您好，在的，线上线下")||ques.includes("先关注本闲鱼号")||ques.includes("升级了机器")||ques.includes("好滴[比心][比心]")){
            回答list.push(NO_REPLY);
        }
        else if(ques.includes("我已拍下")){
            回答list.push(NO_REPLY);
        }
        else if(ques.includes("等待你发货")||ques.includes("记得及时发货")){
            needSendGood = true;
            回答list.push("发货：\n⏬麦德龙APP，切换到“密码登陆\n账："+utils.getPhone()+"\n密：aaaa99\n重要的事情说三遍:\n登陆APP后，一定要晃动一下手机，弹出黑卡就是PLUS会员卡（带附属卡三个字，带有效期）。有了它，进店、结账，畅通无阻！\n①线下人工→结账先出示会员码，出总价后工作人员扫你的手机支付。\n②线下自助→先用机器扫商品，再用登陆了会员的App首页扫结账码。\n③线上→留地址和您自己的电话，配送到家。");
            //回答list.push("本闲鱼长期维护账号密码，关注本闲鱼号即可永久享受PLUS会员！粉丝永久使用不限次数，有问题找我[比心][比心]");
            回答list.push("最近少部分店面升级了机器,要求必须微信付款。亲亲遇到这种请走人工通道尽量使用支付宝结帐(微信会校验App账号与小程序的麦德龙账号一致性)");
            回答list.push("好用的话请帮忙给个好评哦[飞吻][飞吻]");
        }
        else if(((ques.includes("登")||ques.includes("密码")||ques.includes("账号"))&&
        (ques.includes("不")||ques.includes("错")||ques.includes("无")||ques.includes("改")||ques.includes("过期")||ques.includes("失败")||ques.includes("没")||ques.includes("变")||ques.includes("换")))
        ||ques.includes("风险")||ques.includes("异常")||ques.includes("失效")||ques.includes("之前")||ques.includes("以前")||ques.includes("上次")||ques.includes("上回")||ques.includes("拍过")||ques.includes("重新")||ques.includes("还可以")||ques.includes("还能")||ques.includes("验证码")){
            if(ques.includes("1.之前账号异常")){
                回答list.push(NO_REPLY);
            }
            else{
                回答list.push("1.之前账号异常，新账号"+utils.getPhone()+" 密码aaaa99。关注本闲鱼号，即可永久享受PLUS会员！[比心][比心]\n2.确认下账号密码有没有输错\n3.确认下载的官方APP-“麦德龙”，不是英文\"METRO\"那个");
            }
        }
        else if(ques.includes("到期")||ques.includes("有效期")||ques.includes("永久")||ques.includes("多久")||ques.includes("一直")||ques.includes("年卡")
        ||ques.includes("一次")||ques.includes("1次")||ques.includes("次卡")||ques.includes("午")||ques.includes("时间")||ques.includes("天")||ques.includes("现在")||ques.includes("马上")){
            回答list.push("先关注我然后直接拍，即可0.1元一直使用（一年以上）。拍下发送账号，可以随时登录，也可以提前登录。永久享受PLUS会员！以后登录有问题找我免费发新账号。");
        }
        else if(((ques.includes("借用")||ques.includes("你的")||ques.includes("你发的")||ques.includes("我的")||ques.includes("你自己"))&&ques.includes("号"))||ques.includes("副卡")||ques.includes("多人")||ques.includes("其他人")||ques.includes("别人")||ques.includes("别的人")){
            回答list.push("是的，用我的账号(副卡)登录，跟自己开通199一样的，只是没有积分");
        }
        else if(ques.includes("顶下去")){
            回答list.push("一般不会登出，如果登出了重新登录即可。万一登录不上来找我就行。");
        }
        else if((ques.includes("付钱")||ques.includes("付款")||ques.includes("微信")||ques.includes("支付宝"))&&!ques.includes("待付款")&&!ques.includes("我已付款")){
            回答list.push("付款是用自己的微信支付宝的付款码");
        }
        else if((ques.includes("独")||ques.includes("个人"))&&ques.includes("号")){
            回答list.push("不是单独/个人账号，直接用我的账号登录，跟自己开通199一样的");
        }
        else if((ques.includes("这样"))&&(ques.includes("行")||ques.includes("可以")||ques.includes("能")||ques.includes("对"))){
            回答list.push("对的，进门和结帐出示会员码就行了");
        }
        else if(ques.includes("我完成了评价")){
            回答list.push("感谢[比心][比心]");
        }
        else if(ques.includes("1毛")||ques.includes("一毛")||ques.includes("1元")||ques.includes("一元")
            ||ques.includes("1块")||ques.includes("1分")||ques.includes("一块")||ques.includes("一分")
            ||ques.includes("0.1")||ques.includes("0.01")){
            回答list.push("是的，直接拍吧");
        }
        else if(ques.includes("本人")||ques.includes("带人")||ques.includes("几个人")||ques.includes("多少人")){
            回答list.push("账号登录后可以带其他人进店，不需要每人都有会员，也不核对照片");
        }
        else if(ques.includes("进店")){
            回答list.push("是的，进店需要出示会员码");
        }
        else if(ques.includes("京东")){
            回答list.push("抱歉，不支持京东");
        }
        else if(ques.includes("小程序")||ques.includes("app")||ques.includes("下载")){
            回答list.push("不支持小程序，因为需要发验证码绑定，还是麻烦下载官方APP-“麦德龙”，不是英文\"METRO\"那个哈");
        }
        else if(ques.includes("停车")||ques.includes("车牌")){
            回答list.push("每个店情况不同，结帐后问下收营员；如果需要绑定车牌则不能免费停车。不用绑定车牌的话一般是拿[结账单]在出口处登记车牌免费停。具体以咨询店员为准。");
        }
        else if(ques.includes("券") || ques.includes("卷")){
            回答list.push("优惠券都可用，自己在app-我的-常用工具-领券中心领取，每日9点 14点限量开抢，一般半小时就没了");
            回答list.push("每天9点还可以抢一下运费券");
        }
        else if(ques.includes("电子卡")||ques.includes("绑定")||ques.includes("购物卡")){
            res = "可以用账号登录后绑定购物卡进行结帐";
        }
        else if(ques.includes("门店")||ques.includes("全国")||(ques.startsWith('在')&&ques.length<=3)||ques.includes("有人")||ques.includes("能用")||ques.includes("通用")||
            ques.includes("直接拍")||ques.includes("还有")||ques.includes("有吗")||ques.includes("怎么")||ques.includes("能用")||ques.includes("能不能")||
            ques.includes("你好")||ques.includes("您好")||ques.includes("可以")||ques.includes("现在有")||
            ques.includes("嗨")||ques.includes("哈喽")||ques.includes("hi")||ques.includes("hello")||ques.includes("Hi")||ques.includes("Hello")||ques.includes("nihao")){
                回答list.push("您好，在的，线上线下全国通用，不限门店，麦德龙PLUS会员，享受PLUS折扣价。");
                回答list.push("先关我然后直接拍，粉丝0.1元（关注后自动改价）;自动发账号密码，永久使用，不限次数！"); 
        }
        else if(ques.includes("plus")||ques.includes("会员")){
            回答list.push("是PLUS卡，放心！打开麦德龙APP，手机摇一摇，弹出PLUS会员卡；显示附属卡、PLUS会员有效期；有了它，享受PLUS会员价，进店、收营员结帐畅通无阻！\n(界面存在'去升级/立即开通'不用管, PLUS附属卡都会这么显示)");
        }
        else if(ques=="好"||ques.includes("好的")||ques.includes("好滴")||ques.includes("好嘞")||ques.includes("谢")||ques.includes("ok")||ques.includes("OK")||ques.includes("Ok")||ques.includes("好呢")||ques.includes("嗯")||
        ques.includes("好了")||ques.includes("行了")||ques.includes("关注啦")||ques.includes("关注了")||ques.includes("啦")||ques.includes("可以了")||ques.includes("成功")||ques.includes("已关注")||ques.includes("收到")){
            回答list.push("好滴[比心][比心]");
        }
        else{
            回答list.push("先关注本闲鱼号，然后直接拍，粉丝0.1元（关注后自动改价）永久使用，不限次数！"); 
        }
    }
    catch (error) {
        // 处理异常的代码
        console.error('getAnswer捕获到异常：', error);
        回答list.push(NO_REPLY);
    } finally {
        // 无论是否发生异常，都会执行的代码
        console.log('getAnswer执行完毕');
    }
    return 回答list;
}