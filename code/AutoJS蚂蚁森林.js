launchApp("支付宝");//打开支付宝APP

sleep(1000);
 var 控件对象 = idContains("text").text("蚂蚁森林").findOne();
 click(控件对象.bounds().centerX(), 控件对象.bounds().centerY())

exit()
text("森林新消息").findOne();
toast("打开蚂蚁森林成功");

// requestScreenCapture();
// console.log("requestScreenCapture");
// sleep(1500);
if (!requestScreenCapture()) {
    console.log("请求截图失败");
    exit()
}
else{
    console.log("请求截图成功");
}
var yellow = images.read("/sdcard/Android/yellow.png");

console.log(yellow);
sleep(2500);
while (textContains("返回我的森林").exists() == 0) {
    var 截图 = captureScreen();
    let 找图结果 = images.matchTemplate(截图, yellow, {
        region: [0, 350, 1080, 1000],
        threshold: 0.97,
        max: 6,
    });
    // sleep(500);

    n = 找图结果.points.length;

    for (i = 0; i < n; i++) {
        click(找图结果.points[i].x, 找图结果.points[i].y);
        // sleep(200);
    }
    // var time=0;
    // while(time<6){
    //     var 截图 = captureScreen();
    //     var 能量球 = findColor(截图, "#ffb9ff00", {
    //         region: [0, 350, 1080, 1000],
    //         threshold: 4,
    //     })
    //     if (能量球) {
    //         console.log(能量球.x+","+能量球.y);
    //         click(能量球.x, 能量球.y);
    //         time ++;
    //     }
    //     else{
    //         break;
    //     }
    // }
    click(980, 1570);
    sleep(3000);
}



if(text("去收取").exists() == 1){
    var 控件对象 = text("去收取").findOne();
    click(控件对象.bounds().centerX(), 控件对象.bounds().centerY());//点击“去收取”选项

    var 控件对象 = className("android.view.View").text("立即开启").findOne();
    sleep(2000)
    click(控件对象.bounds().centerX(), 控件对象.bounds().centerY());//点击“立即开启”选项
    
    sleep(2500);
    
    var time = 0;
    while (time < 130) {
        var 截图 = captureScreen();
        var 能量球 = findColor(截图, "#ffb9ff00", {
            region: [0, 200, 1080, 1600],
            threshold: 4,
        })
        if (能量球) {
            click(能量球.x + 15, 能量球.y + 160);
        }
        time++;
    }

    text("送TA机会").click();
    var 控件对象 = className("android.view.View").text("立即开启").findOne();
    sleep(2000)
    click(控件对象.bounds().centerX(), 控件对象.bounds().centerY());//点击“立即开启”选项
    
    sleep(2500);
    
    var time = 0;
    while (time < 130) {
        var 截图 = captureScreen();
        var 能量球 = findColor(截图, "#ffb9ff00", {
            region: [0, 200, 1080, 1600],
            threshold: 4,
        })
        if (能量球) {
            click(能量球.x + 15, 能量球.y + 160);
        }
        time++;
    }
}

if(text("去赠送").exists() == 1){
    var 控件对象 = text("去赠送").findOne();
    click(控件对象.bounds().centerX(), 控件对象.bounds().centerY());//点击“去收取”选项
    text("送TA机会").click();

    var 控件对象 = className("android.view.View").text("立即开启").findOne();
    sleep(2000)
    click(控件对象.bounds().centerX(), 控件对象.bounds().centerY());//点击“立即开启”选项
    
    sleep(2500);
    
    var time = 0;
    while (time < 130) {
        var 截图 = captureScreen();
        var 能量球 = findColor(截图, "#ffb9ff00", {
            region: [0, 200, 1080, 1600],
            threshold: 4,
        })
        if (能量球) {
            click(能量球.x + 15, 能量球.y + 160);
        }
        time++;
    }
}


openAppSetting(getPackageName("支付宝"));
text("强行停止").findOne().click();
text("强行停止").findOne().click();
home();