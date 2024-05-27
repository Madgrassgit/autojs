/**
 * 判断图片是否存在
 * @param {*} path 
 * @param {*} checkTime 
 * @param {*} maxTry 
 * @param {*} width 
 * @param {*} height 
 * @returns 
 */
 function isPicExist(path, checkTime, maxTry, width, height){
    var 去发货 = images.read(path);
    var tryTime = 0;
    while(tryTime < maxTry || maxTry == "forever"){
        var 截图 = captureScreen();
        let 找图结果 = images.matchTemplate(截图, 去发货, {
            region: [0, 0, width, height],
            threshold: 0.8,
            max: 1,
        });

        n = 找图结果.points.length;
        console.log("["+path+"]isPicExist["+tryTime+"]：结果数量" + n)
        if(n>=1){
            return true;
        }
        else{
            sleep(checkTime)
            tryTime++
        }
    }
    return false;
}


/**
 * 查找图片数组，返回坐标和index
 * @param {*} paths 需要寻找的图片path数组
 * @param {*} checkTime 
 * @param {*} maxTry 
 * @param {*} left 
 * @param {*} top 
 * @param {*} width 
 * @param {*} height 
 * @returns res{x=坐标x, y=坐标y, index=第几个}
 */
 function waitForPics(paths, checkTime, maxTry, left, top, width, height){
    console.log("[paths]waitForPics[start]")
    var rtn = {};
    let 图片们 = new Array(paths.length);
    for(var i=0;i<paths.length;i++){
        图片们[i] = images.read(paths[i]);
    }
    
    var tryTime = 0;
    while(tryTime < maxTry || maxTry == "forever"){
        var 截图 = captureScreen();
        for(var i=0;i<图片们.length;i++){
            let 找图结果 = images.matchTemplate(截图, 图片们[i], {
                region: [left, top, width, height],
                threshold: 0.8,
                max: 1,
            });

            n = 找图结果.points.length;
            //console.log("["+tryTime+"]["+paths[i]+"]waitForPics"+n)
            if(n>=1){
                console.log("["+paths[i]+"]waitForPics[succ], 找到坐标("+找图结果.points[0].x+","+找图结果.points[0].y+")")
                rtn.x = 找图结果.points[0].x;
                rtn.y = 找图结果.points[0].y;
                rtn.index = i;
                return rtn;
            }
            else{
                continue;
            }
        }
        sleep(checkTime)
        tryTime++
    }
    return null;
}

module.exports = {
    isPicExist:isPicExist,
    waitForPics:waitForPics,
    waitForPicCLick:waitForPicCLick,
    waitForPicStableCLick:waitForPicStableCLick,
    getPhone:getPhone
};


/**
 * 等待图片path出现并点击
 * @param {*} path 图片路径
 * @param {*} checkTime 检验间隔时间
 * @param {*} maxTry 最大检验测试
 * @param {*} width 查找宽度
 * @param {*} height 查找高度
 * return rtn 是否找到并点击
 */
 function waitForPicCLick(path, checkTime, maxTry, left, top, width, height){
    var rtn = false;
    console.log("["+path+"]waitForPicCLick[start]")
    var 去发货 = images.read(path);
    var tryTime = 0;
    while(tryTime < maxTry || maxTry == "forever"){
        var 截图 = captureScreen();
        let 找图结果 = images.matchTemplate(截图, 去发货, {
            region: [left, top, width, height],
            threshold: 0.8,
            max: 1,
        });

        n = 找图结果.points.length;
        console.log("["+path+"]waitForPicCLick["+tryTime+"]：结果"+n)
        if(n>=1){
            click(找图结果.points[0].x, 找图结果.points[0].y);
            console.log("["+path+"]waitForPicCLick[succ], 点击坐标("+找图结果.points[0].x+","+找图结果.points[0].y+")")
            rtn = true;
            break;
        }
        else{
            sleep(checkTime)
            tryTime++
        }
    }
    return rtn;
}


/**
 * 等待图片path出现并连续两次位置不变化，再点击
 * @param {*} path 图片路径
 * @param {*} checkTime 检验间隔时间
 * @param {*} maxTry 最大检验测试
 * @param {*} width 查找宽度
 * @param {*} height 查找高度
 */
function waitForPicStableCLick(path, checkTime, maxTry, left, top, width, height){
    console.log("["+path+"]waitForPicStableCLick[start]")
    var tryTime = 0;
    let pics = [path];
    var lasty = 0;
    var lastx = 0;
    while(tryTime < maxTry  || maxTry == "forever"){
        var res = waitForPics(pics, checkTime, "forever", left, top, width, height);
        if(lasty==res.y && lastx==res.x){
            click(res.x,res.y);
            console.log("["+path+"]waitForPicStableCLick[succ], 点击坐标("+res.x+","+res.y+")")
            break;
        }
        else{
            console.log("["+path+"]waitForPicStableCLick[坐标变化]：["+lastx+","+lasty+"]=>["+res.x+","+res.y+"]")
            lasty = res.y;
            lastx = res.x;
            sleep(checkTime)
        }
        tryTime++;
        
    }
}

/**
 * 第一天
 * @returns 
 */
function getPhone(){
    var myDate = new Date();
    var phones = ['18851123960','17372956277','13776932329','17372956277']

    var days = Math.floor(myDate.getTime()/1000/86400);
    var phone_index = days%phones.length;
    return phones[phone_index];
}

