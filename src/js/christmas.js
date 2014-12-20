/*
 * merry christmas
*/
$(function(){
	var animates={},//动画集合
		animateEvents="webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationend Animationend",
		transitionEvents="webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend Transitionend";

	// 显示底部背景
	// 星星从天上掉下来
	animates.step1=function(){
		var $bottomBg=$(".j-bottomBg"),
			$stars=$(".j-stars");

		$bottomBg.addClass("opacity1 fadeIn");
		setTimeout(function(){
			$stars.addClass("opacity1 bounceInDown").one(animateEvents,animates.step2);
		},300)
	};

	// 礼物袋出现
	// 两边的树由小到大出现
	animates.step2=function(){
		var $treeLeft=$(".j-tree-left"),
			$treeRight=$(".j-tree-right"),
			$bag=$(".j-bag");

		$bag.addClass("opacity1 rubberBand").one(animateEvents,animates.step3);

		setTimeout(function(){
			$treeLeft.addClass("opacity1").removeClass("tn");
			$treeRight.addClass("opacity1").removeClass("tn");
		},600)
	};

	//三个礼物分别从天上掉入到礼物带中
	animates.step3=function(){
		var $gift1=$(".j-gift1"),
			$gift2=$(".j-gift2"),
			$gift3=$(".j-gift3");

		$gift1.addClass("opacity1 bounceInDown");
		setTimeout(function(){
			$gift2.addClass("opacity1 bounceInDown");
		},300);
		setTimeout(function(){
			$gift3.addClass("opacity1 bounceInDown").one(animateEvents,animates.step4);
		},600);
	};

	//大雪花飞到左上角
	animates.step4=function(){
		$(".j-bigSnow").addClass("bigSnow-smallPos").one(transitionEvents,animates.step5);
	}

	// 显示出banner
	animates.step5=function(){
		var $banner=$(".j-banner");

		$banner.addClass("opacity1 flipInX").one(animateEvents,animates.step6);
	}

	// 逐行显示文字
	animates.step6=function(){
		var $mask1=$(".j-textmask1"),
			$mask2=$(".j-textmask2"),
			$mask3=$(".j-textmask3");

		$mask1.addClass("show");
		setTimeout(function(){
			$mask2.addClass("show");
		},2000);
		setTimeout(function(){
			$mask3.addClass("show");
		},4000);
	}

	//资源预加载
	var preload={},
		$loading=$(".loading-mask"),
		path=ISPRO ? "dist" : "src";

	//图片集合
	preload.imgs=[
		path+'/images/car.png',
		path+'/images/bg_bottom.png',
		path+'/images/sprite_bigSnow.png',
		path+'/images/stars.png',
		path+'/images/tree.png',
		path+'/images/bag.png',
		path+'/images/sprite_gifts.png',
		path+'/images/glove.png',
		path+'/images/banner.png'
	];
	preload.loadedPer=0;//已经加载的百分比
	preload.eachItemPer=100/preload.imgs.length;//每个加载项的百分比
	//加载图片
	preload.doLoadImg=function(src){
		var tmp=new Image();
		tmp.src=src;
		tmp.onload=function(){
			preload.loadedPer+=preload.eachItemPer;
			$loading.find(".progres-bar")
			.css("width",preload.loadedPer+"%")
			.one(transitionEvents, function(){
				if(parseInt(preload.loadedPer)>=99){
					$loading.find(".loading-text").text("加载完成");
					$("#j-playBgMusic").fadeIn(200);
				}
			})
		}
	}

	//预加载每个图片
	for(var i=0;i<preload.imgs.length;i++){
		preload.doLoadImg(preload.imgs[i]);
	}

	//点击播放背景音乐并显示贺卡
	$('#j-playBgMusic').click(function(){
		$(".loading-mask").addClass("outLeft");
		$(".page").addClass("in");
		setTimeout(animates.step1,300);
		$("#bgmusci")[0].play();
	});
});