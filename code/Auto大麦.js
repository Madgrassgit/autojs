launchApp("大麦");
sleep(1000);
var now;
var hour;
var min;
var sec;
var millsec;
// console.log("1");
// press(650 ,2250,5);
// longClick(650 ,2250);
// console.log("2");
while(true){
    now = new Date();
    hour = now.getHours();
    min = now.getMinutes();
    sec = now.getSeconds();
    //millsec = now.getMilliseconds();
    
    // if(sec%5==0){
    //     click(650 ,2250);
    // }
    // if(hour==13 && min==39){
    //     click(650 ,2250);
    // }
    // else{
    //     sleep(4);
    // }
}


// if (!requestScreenCapture()) {
//     console.log("请求截图失败");
//     exit()
// }
// else{
//     console.log("请求截图成功");
// }

// sleep(2000);

// var time = 0;
// // while (time < 130) {
//     var 截图 = captureScreen();
//     var 能量球 = images.findAllPointsForColor(截图, "#ffb9ff00", {
//         region: [0, 350, 1080, 1000],
//         threshold: 4,
//     })
//     if (能量球) {
//         for(let i=0;i<能量球.length;i++){
//             console.log("time="+time+":"+能量球[i].x+","+能量球[i].y);
//             time++;
//         }
        
//         //click(能量球.x,能量球.y);
        
//     }
//     // else{
//     //     break;
//     // }
// // }

// function checkPos_existed(arr,pos,dis){
//     for(let i=0;i<arr.length;i++){
//         if(Math.abs(arr[i].x-pos.x)<dis || Math.abs(arr[i].y-pos.y)<dis)
//         {
//             return true;
//         }
//     }
//     return false;
// }
// // let arr = []
// // var pos = {}
// // pos.x = 1;
// // pos.y = 2;
// // arr.push(pos)
// // for(let i=0;i<arr.length;i++){
// //     console.log(Math.abs(arr[i].x-arr[i].y))
// // }

