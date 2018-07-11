var count = 0;
var video_boxs = document.querySelectorAll('.container > div');
var left_nav_li = document.querySelectorAll('.left_nav > ul > li');

// 获取浏览器高度，给每个video设置相同的高度
var video = document.getElementsByClassName("video");
var clientY = document.documentElement.clientHeight;
for(let i = 0; i < video.length - 1; i++) {
	video[i].style.height = clientY + "px";
}

// 键盘上下按键换页事件
function upDown(event) {
	var step = '';
	video_boxs[count].querySelector('video').pause();
	if(event.key == 'ArrowDown') {
		step = "down";
	}else if(event.key == 'ArrowUp') {
		step = "up";
	}
	changeBox(step);
}

// 滚动条滚动事件
var isChange = false;
var scrollFunc = function (e) {
	var step = "";
	
    e = e || window.event;  
    if (e.wheelDelta) {  //第一步：先判断浏览器IE，谷歌滑轮事件               
        if (e.wheelDelta > 0) { //当滑轮向上滚动时  
            step = "up";  
        }  
        if (e.wheelDelta < 0) { //当滑轮向下滚动时  
            step = "down";  
        }  
    } else if (e.detail) {  //Firefox滑轮事件  
        if (e.detail> 0) { //当滑轮向上滚动时  
            step = "up";  
        }  
        if (e.detail< 0) { //当滑轮向下滚动时  
            step = "down";  
        }  
    }
    // 隔3秒才执行盒子切换
	// 每滚动只执行一次
	if (!isChange) {
		// 如果没有切换盒子，那么就执行changeBox
		setTimeout(function () {
			changeBox(step);
		},200)
		// 改变为正在切换
		isChange = true;
	} 
}

// 切换页面事件
function changeBox(step, num) {

	var container = document.getElementsByClassName("container")[0];
	video_boxs[count].querySelector('video').pause();
	left_nav_li[count].style.color = "#ffffff";
	if(num > 0) {
		count = num;
	} else {
		if (step == "down") {
			count = ++count;
		}else if (step == "up") {
			count = --count;
		}
	}

	// 判断页面数（count）越界
	if(count <= 0) {
		count = 0;
	}else if(count >= video_boxs.length) {
		count = video_boxs.length - 1;
	}

	container.style.transform = `translate(0,${-clientY * count}px)`;
	left_nav_li[count].style.color = "#e69800";
	video_boxs[count].querySelector('video').play();
	isChange = false;
}


// 绑定键盘事件
window.addEventListener('keyup', upDown, false);

// 绑定滚动事件
//  Firefox
if(document.addEventListener) {
	document.addEventListener('DOMMouseScroll', scrollFunc, false);
} 
// Chrome
window.addEventListener('mousewheel', scrollFunc, false);	
