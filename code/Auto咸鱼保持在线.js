while(true){
    //在闲鱼主界面(存在"闲鱼"、"消息"tab页签)
    //最小化并重新打开闲鱼
    if(text("闲鱼").exists() && text("消息").exists() && !descStartsWith("未读数").exists()){
        console.log("第1次判定通过... ")
        sleep(10000)
        if(text("闲鱼").exists() && text("消息").exists() && !descStartsWith("未读数").exists()){
            console.log("第2次判定通过... ")
            sleep(10000)
            if(text("闲鱼").exists() && text("消息").exists() && !descStartsWith("未读数").exists()){
                console.log("第3次判定通过, 最小化闲鱼...")
                home();
                sleep(500)
                app.launchApp("闲鱼");
                var 消息tab = text("消息").findOne();
                click(消息tab.bounds().centerX(), 消息tab.bounds().centerY())
                console.log("激活闲鱼, 等待50-80s... ")
                sleep(getRandom());
            }
            else{
                console.log("第3次判定失败")
            }
        }
        else{
            console.log("第2次判定失败")
        }
        
    }
    //等待5秒重新判断
    else{
        console.log("第1次判定失败，等待5s")
        sleep(5000)
    }
    
    //不在闲鱼主界面
    
    // sleep(6000)
    // if(!text("消息").exists()){
    //     console.log("not exist");
    //     back();
    // }
    // else{
    //     console.log("exist");
    //     
    // }
    
}


/**
 * 获取50-80秒随机等待毫秒
 */
 function getRandom(){
    var random1 = Math.round(Math.random()*30000) + 50000;
    return random1;
}