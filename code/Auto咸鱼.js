// var id = setInterval(function(){
//     console.log("请求截图失败");
//     toast("hello");
// }, 5000);
// //1分钟后取消循环
// setTimeout(function(){
//     clearInterval(id);
// }, 20 * 1000);

// launchApp("闲鱼");
// sleep(1000);
groundingMetro();
/**
 * 上架
 */
function groundingMetro(){
    //卖闲置
    click(500, 2200)
    className("android.widget.ImageView").descStartsWith("发闲置").findOne().click()
    descStartsWith("描述").untilFind()
    sleep(100);

    editDesc();

    picSelect();

    fenleiSelect();

    priceSelect();

    desc("发布").click()
    desc("发布成功").untilFind()
    back()
    back()
}


/**
 * 删除最后一个上架商品
 */
 function deleteMetro(){
    // var 我的 = text("我的").findOne();
    // var click_res = click(我的.bounds().centerX(), 我的.bounds().centerY())
    // var 我发布的 = descStartsWith("我发布的").findOne();
    // click_res = click(我发布的.bounds().centerX(), 我发布的.bounds().centerY())
    
    /**
     * 下滑到最后一个上架商品
     * 屏幕滑动停止后，页面可以点击
     */
    while(!desc("这些值得卖").exists()){
        swipe(100, 500, 100, 100, 200)
    }
    sleep(3000);
    /**
     * 点击最后一个商品
     */
    var 商品 = className("android.widget.ImageView").descContains("更多").find();
    var last商品 = 商品[商品.length-1]
    console.log(last商品.bounds().centerX());
    console.log(last商品.bounds().centerY());
    click(last商品.bounds().centerX(), last商品.bounds().centerY())
    desc("管理").findOne().click();
    desc("删除").findOne().click();
    // desc("确定").findOne().click();
    back();
}

/**
 * 编辑描述
 */
function editDesc(){
    setClip("[超便宜]【拍下秒发】麦德龙plus 麦德龙plus会员 麦德龙plus卡 麦德龙 会员 plus会员附属卡\n[白菜]只需0.01元，拍完直接发账号登录，用完好评，永久有效\n(门店和网购都通用，全国都能用）\n【适用门店】：全国麦德龙门店+线上\n[招财猫]【福利优惠】: 享受plus价格，免费停车3小时（要绑定车牌的店除外）");
    // var target = className("android.view.View").descStartsWith("描述").findOne()
    // var res = target.paste();
    // 1.输入法粘贴法
    click(500, 500)
    sleep(1000)
    click(675, 1551)
    sleep(1000)
    click(675, 2100)
    back()

    // // 2.长按粘贴法 时长超过500毫秒，则被系统认为是长按
    // // press(500, 500, 5000)  失败，longClickable 为false ,系统会在5秒后当成click处理

    // // 3.双击粘贴法 
    // // press(500, 500, 10)
    // // sleep(10)
    // // press(500,500,10)//确实点击了2次，文字甚至选中，但无法

    // // 3.控件输入法
    // var target = className("android.view.View").descStartsWith("描述").findOne()
    // //target.setText("我是文本a")  //仅为object对应的控件设置文本;
    // //setText("我是文本a"); //为所有可输入控件设置文本;
    // //setText ([1], "String");setText("String") // 置入文本"String";
    // //target.input("我是文本a")
}

/**
 * 选择图片
 */
function picSelect(){
    className("android.widget.ImageView").desc("添加图片").findOne().click()
    /**
     * 主图
     */
    desc("所有文件").findOne().click()
    descStartsWith("麦德龙主图·").findOne().click()
    sleep(100)
    desc("查看大图").indexInParent("3").findOne().child(0).click()

    /**
     * 附图
     */
    desc("麦德龙主图").findOne().click()
    descStartsWith("麦德龙附图·").findOne().click()
    // while(true){
    //     console.log("wait")
    //     console.log(desc("查看大图").find().length)
    //     if(desc("查看大图").find().length>0) break
        
    // }

    sleep(100)
    var 附图集合 = depth("14").indexInParent("0").find()
    for(var i=0;i<附图集合.length;i++){
        附图集合[i].click()
    }
    sleep(100)

    /**
     * 完成图片
     */
    descStartsWith("下一步").click()
    descStartsWith("完成").untilFind()
    sleep(1000)
    descStartsWith("完成").click()
    desc("更多信息").untilFind()
 
    /**
      * 下滑
      */
    while(!descStartsWith("10分钟发货").exists()){
        swipe(100, 1500, 100, 1300, 200)
    }
    sleep(1000);
}

/**
 * 选择分类
 * 找到"分类"的位置，并移动直到"会员卡/优惠券"出现并点击
 */
function fenleiSelect(){
    /**
     * 长度太长/高度太高的不算
     */
    var index = 0;
    var y = 0;
    for(var i=0;i<depth("11").find().length;i++){
        if(depth("11").find()[i].desc().length<10 && depth("11").find()[i].bounds().centerY()>1000){
            if(depth("11").find()[i].bounds().centerY()>y){
                index = i
                y = depth("11").find()[i].bounds().centerY()
            }
        }
    }

    var x = depth("11").find()[index].bounds().centerX()
    while(!descContains("会员卡").descContains("优惠券").exists()){
        swipe(x, y, x-100, y, 100)
    }
    sleep(200)
    descContains("会员卡").descContains("优惠券").click()

    desc("电子券").click()
    descStartsWith("13-36").click()
    desc("200元").click()
}

/**
 * 选择价格
 * 找到"分类"的位置，并移动直到"会员卡/优惠券"出现并点击
 */
 function priceSelect(){
     

    var 价格设置 = descContains("价格设置").findOne();
    click(价格设置.bounds().centerX(), 价格设置.bounds().centerY())
    desc("0").findOne().click()
    sleep(100)
    desc(".").findOne().click()
    sleep(100)
    desc("0").findOne().click()
    sleep(100)
    desc("1").findOne().click()

    descContains("原价设置").findOne().click();
    sleep(100)
    desc("1").findOne().click()
    sleep(100)
    desc("9").findOne().click()
    sleep(100)
    desc("9").findOne().click()
    desc("确定").findOne().click()
 }
