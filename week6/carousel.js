function setSize (width,height){
	//设置容器的宽度
	$(".container").css({
		width: width + "px",
		height: height + "px"
	});
	//设置图片宽度
	$(".photoContainer").children("img").css({
		width: width + "px",
		height: height + "px"
	});
	$(".photoContainer").css({
		left:-width + "px"
	});
}


$(document).ready(function($) {
	//设置容器宽度
	setSize(600,400);
	//默认第一个小圆点是亮的
	$(".dots").children("li").eq(0).addClass("redDot");

	//获取图片的宽度
	var imgWidth = $(".photoContainer").children('img').eq(0).width();

	//获取原点的数量
	var length = $(".dots").children('li').length;
	var time;

	//周期性播放事件
	function run(){
	clearInterval(time);
	time = setInterval(function(){
		//亮小圆点
		$(".dots").children('li').each(function(){
			//如果是当前图片
			if($(this).hasClass("redDot")){
				num = $(this).index()+ 1;
			//图片移动
				$(".photoContainer").animate({
					//去掉收尾用于衔接的图片的宽度
					left :-num*imgWidth - imgWidth + "px"
				},800);
				//到达最后一张，从头开始
				if(num == length){
					$(".photoContainer").animate({
						left:-imgWidth+"px"
					},0);
					num = 0;
				}
			}
		});
			//改变相应小圆点的样式
			$(".dots").children('li').eq(num).addClass("redDot");
			//移除其他小点的样式
			$(".dots").children('li').eq(num).siblings("li").removeClass('redDot');
		},2000);
	}
	run();

	//左边按钮添加事件
	$(".left-triangle").click(function(event) {
		var flag; 
		//判断当前在哪一个照片
		$(".dots").children('li').each(function(){
			//将图片容器向右移动
			if($(this).hasClass('redDot')){
				flag = $(this).index() - 1;
					$(".photoContainer").animate({left: -flag * imgWidth - imgWidth+"px"}, 300);
				//当达到最左边的时候
				if(flag < 0){
					flag = length-1;
					$(".photoContainer").animate({left: -flag * imgWidth - imgWidth+"px"}, 0);
				}

			}
		});
		//图标按钮改变
		$(".dots").children('li').eq(flag).addClass('redDot');
		$(".dots").children('li').eq(flag).siblings('li').removeClass('redDot');
	});


	//右边按钮添加事件
	$(".right-triangle").click(function(event) {
		var flag ;//判断当前在哪一个照片
		$(".dots").children('li').each(function(){
			//将图片容器向左移动
			if($(this).hasClass('redDot')){
				flag = $(this).index() + 1;
				console.log(flag);
				$(".photoContainer").animate({left: -flag * imgWidth - imgWidth +"px"}, 300);
				//当达到最右边的时候 回到最左边
				if(flag == length){
					flag = 0;
					$(".photoContainer").animate({left: -imgWidth + "px"}, 0);
				}
			}
		});
		//图标按钮改变
		$(".dots").children('li').eq(flag).addClass('redDot');
		$(".dots").children('li').eq(flag).siblings('li').removeClass('redDot');
	});

	//给小点添加事件 事件委托
	$(".dots").on("click","li",function(event) {
		$(this).addClass('redDot');
		$(this).siblings('li').removeClass('redDot');
		//获取当前序号
		var flag = $(this).index();
		$(".photoContainer").animate({
			left: -flag*imgWidth - imgWidth + "px"},
			300);
	});

		//鼠标移动到窗口内
	$(".container").mousemove(function(event) {
		clearInterval(time);
	});
	$(".container").mouseout(function(event) {
		run();
	});
});


