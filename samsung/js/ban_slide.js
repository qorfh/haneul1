var interval, player, remainingTime, setTime;
var auto = true;
var timer = 2000;
var slideIndex = 0;
var ct = $(".slide").length;

setInterval(function(){
	if(slideIndex == 3 || slideIndex == 4){
		$(".white").removeClass("white").addClass("black");
	} else{
		$(".black").removeClass("black").addClass("white");
	}
}, 500)

setTimeout(function(){
	$(".s-line-filled").eq(0).css({
		width:"100%",
		transition : (timer-50)/1000+"s linear"
	});
},0);

function nextBtn(){
	remainingTime = 0;
	slideIndex++;
	slideIndex = slideIndex%ct;
	$(".slide").removeClass("active");
	$(".slide").eq(slideIndex).addClass("slide active");
	if(auto){
		indicator(slideIndex);
		autoPlay();
	}else{
		$(".s-line-filled").css({
			width:"0",
			transition : "none"
		});
	}
	
}

function prevBtn(){
	remainingTime = 0;
	slideIndex--;
	slideIndex = slideIndex==-1 ? slideIndex = ct-1 : slideIndex;
	$(".slide").removeClass("active");
	$(".slide").eq(slideIndex).addClass("slide active");
	if(auto){
		indicator(slideIndex);
		autoPlay();
	}else{
		$(".s-line-filled").css({
			width:"0",
			transition : "none"
		});
	}
	
}

function next(){
	slideIndex++;
	slideIndex = slideIndex%ct;
	$(".slide").removeClass("active");
	$(".slide").eq(slideIndex).addClass("slide active");
	if(auto){
		indicator(slideIndex);
	}
	
	
}

function prev(){
	slideIndex--;
	slideIndex = slideIndex==-1 ? slideIndex = ct-1 : slideIndex;
	$(".slide").removeClass("active");
	$(".slide").eq(slideIndex).addClass("slide active");
	if(auto){
		indicator(slideIndex);
	}
	

}

function goPage(index){
	remainingTime = timer; 
	slideIndex = index;
	$(".slide").removeClass("active");
	$(".slide").eq(index).addClass("slide active");
	$(".s-line-filled").css({
		width:"0",
		transition : "none"
	});
	
}

function autoPlay(){
	auto = true;
	clearInterval(player);
	player = setInterval(next, timer);
}

function indicator(i){
	$(".s-line-filled").css({
		width:"0",
		transition : "none"
	});
	$(".s-line-filled").eq(i).css({
		width:"100%",
		transition : timer/1000+"s linear"
	});
}

// 마우스 올렸을 때 filled-line이 멈추는 하는 원리
// 1. mouseenter 때 pause()실행, mouseenter 때 start() 실행
// 2. pause상태에서 총길이(fullWidth)와 채워진 길이(filledWidth) 구하기
// 3. css로 filled-line 길이 고정 
// 4. 남은 시간 구하기 ==> 총길이 : 채워진 길이 = 전체시간(timer) : x
// 5. x값이 남은 시간이 되므로 x를 구해서 반올림.
// 6. 변수로 저장해서 mouseleave 이벤트(마우스가 벗어날 때) transtion에 적용.
// 7. 이후 다시 autoPlay 실행

function pause(){
	clearInterval(player);
	clearTimeout(setTime);
	var fullWidth = $('.s-line').width();
	var filledWidth = $('.s-line-filled').eq(slideIndex).width();
	$(".s-line-filled").eq(slideIndex).css({
		width: filledWidth+"px",
		transition : "none"
	});
	remainingTime = timer - Math.round(filledWidth / fullWidth * timer);
}

function start(){
	clearTimeout(setTime);
	var width = $(this).find('.s-line-filled').width();
	$(".s-line-filled").eq(slideIndex).css({
		width: "100%",
		transition : remainingTime/1000+"s linear"
	});
	setTime = setTimeout(function(){
		next();
		autoPlay();
	},remainingTime);
}

$(document).on('click', '.next', function(){
	nextBtn();
})

$(document).on('click', '.prev', function(){
	prevBtn();
})

$(document).on('click', '.autoplay', function(){
	if(auto){
		auto = false;
		pause();
	}else{
		auto = true;
		start();
	}
});
$(document).on('click', '.pause', function(){
	if(auto){
		auto = false;
		pause();
	}else{
		auto = true;
		start();
	}
});

$(document).on({
	mouseenter : function(){
		if(auto){
			pause();
		}
	}, mouseleave : function(){
		if(auto){
			start();
		}
	}, click : function(){
		var i = $(this).index();
		goPage(i);
	}
}, '.slide_line li');


$(document).on('click', '.controls button', function(){
	if($(this).hasClass("autoplay")){
		$(this).removeClass("autoplay").addClass("pause");
	}else if($(this).hasClass("pause")){
		$(this).removeClass("pause").addClass("autoplay");
	}
});

autoPlay();