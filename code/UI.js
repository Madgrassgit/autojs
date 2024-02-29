"ui";
var utils = require('utils.js');

//去除顶部状态栏，此方法在安卓7-10有效果，安卓11无效（状态栏不在占位置）
activity.window.addFlags(android.view.View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);

//改变栏的颜色，Pro版本生效（状态栏仍然占据顶部的位置）
ui.statusBarColor("red");
ui.layout(
    <frame w="*" h="*">
        <img w="*" h="*" id="pic" scaleType="fitXY" src="file:///sdcard/autojs/maidelong/麦德龙首页.jpg"/>
        <button w="100px" h="140px" marginLeft="55px" marginTop="1700px" id="shouye" style="hiddern"/>
        <button w="100px" h="140px" marginLeft="260px" marginTop="1700px" id="fenlei" style="hiddern"/>
        <button w="100px" h="140px" marginLeft="920px" marginTop="1700px" id="wode" style="hiddern"/>
        <button w="150px" h="150px" marginLeft="820px" marginTop="70px" id="ma" style="hiddern"/>
        <button w="150px" h="150px" marginLeft="520px" marginTop="500px" id="test" style="Widget.AppCompat.Button.Colored"/>
    </frame>
);

//按钮样式style/Widget.AppCompat.Button.Colored
//指定确定按钮点击时要执行的动作
ui.shouye.click(function(){
    ui.pic.attr('src',"file:///sdcard/autojs/maidelong/麦德龙首页.jpg")
});
ui.fenlei.click(function(){
    ui.pic.attr('src',"file:///sdcard/autojs/maidelong/麦德龙分类.jpg")
});
ui.wode.click(function(){
    ui.pic.attr('src',"file:///sdcard/autojs/maidelong/麦德龙我的.jpg")
});
ui.ma.click(function(){
    ui.pic.attr('src',"file:///sdcard/autojs/maidelong/麦德龙码.jpg")
});
ui.test.click(function(){
    utils.testpost();
});



// //启用触摸监听 需要root
// events.observeTouch();
// //注册触摸监听器
// events.onTouch(function(p){
//     //触摸事件发生时, 打印出触摸的点的坐标
//     console.log(p.x + ", " + p.y);
// });

// //启用按键监听
// events.observeKey();
// //监听音量下键弹起
// events.onKeyDown("volume_down", function(event){
//     ui.pic.setsrc = "file:///sdcard/autojs/maidelong/麦德龙码.jpg";
//     toast("音量下键弹起"+ui.pic.getWidth());
// });
