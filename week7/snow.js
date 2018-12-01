
//雪花的原型
function Snow (){
}
Snow.prototype = {
	//x坐标
	x : 0,
	//y坐标
	y : 0,
	//半径
	radius:5
};

function Sky(){	
}
Sky.prototype = {
	//画布的宽和高
	wid:window.innerWidth, // 屏幕宽度
	hei:window.innerHeight, //屏幕的高度
	snowNum:100, //雪花的数量
	snows:new Array(), // 存放雪花的数组
	//初始化雪花
	creat: function(){
	 //雪花的数组 
		for(let i = 0;i<this.snowNum;i++){
			snow = new Snow();//每次要new一个Snow对象
			snow.x = Math.random() * this.wid;
			snow.y = Math.random() * this.hei;
			snow.radius = Math.random() * 10 + 1;
			this.snows.push(snow);
		}
		console.log("test");
	},
	//雪花飘落
	fall: function(){
		for(let i = 0; i<this.snowNum; i++){
			this.snows[i].y += Math.random() * 5 + 1;
			if(this.snows[i].y >this.hei){
				this.snows[i].y = 0;
			}
			this.snows[i].x += Math.random() * (-2) + 1;
			if(this.snows[i].x > this.wid){
				this.snows[i].x = 0;
			}
		}
	},
	//画雪花
	draw: function(){
		//获取mycanvas画布
		var can = document.getElementById("myCanvas");
		var ctx = can.getContext("2d");
		can.width = this.wid;
		can.height = this.hei;
		ctx.clearRect(0,0,this.wid,this.hei);
		ctx.fillStyle = "white";
		ctx.beginPath();
		//画每个雪花
		for (let i = 0; i< this.snowNum; i++){
			ctx.moveTo(this.snows[i].x,this.snows[i].y);
			ctx.arc(this.snows[i].x, this.snows[i].y, this.snows[i].radius,0,2*Math.PI,false);
		}
		ctx.fill();
		//更新雪花的坐标
		this.fall();
		ctx.closePath();
	},
	snowing:function(){
		//!!!一定要加（）=》！！！
		setInterval(() => {
			this.draw();
		}, 80);
	}
};

let sky = new Sky(); // 画布
sky.creat();
sky.snowing();
// // sky.draw();
// setInterval(sky.snowing,200);

