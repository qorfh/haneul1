//gnb
$(document).ready(function(){
	$('.depth1').hover(
		function(){ 
			var index = $(this).index();
			$(".dropBox").eq(index).show();
		},
		function(){
			$(".dropBox").hide();
		})

	$('.dropBox').hover(
			function(){
				$(this).show();
			},
			function(){
				$(this).hide();
			})
	// visual-story-slide
	$('.center').slick({
		  centerMode: true,
		  centerPadding: '60px',
		  slidesToShow: 3,
		  variableWidth: true,
		  dots: true,
		  responsive: [
		    {
		      breakpoint: 768,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 3
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 1
		      }
		    }
		  ]
		});

	// galaxy-3column
	$(".galaxy-3column a").hover(function(){
	$(this).find("h3").css({textDecoration:"underline"});
	},function(){
		$(this).find("h3").css({textDecoration:"none"});
	});
	if (matchMedia("screen and (max-width: 768px)").matches) {
		$(".galaxy-3column div").each(function(i){
		$(this).css({left: 100 * i +'%'});
		});
	}

}); 

$(document).on('click','.g_dot a',function(e){
	e.preventDefault();
	if( !$(this).hasClass('active') ){
		$('.g_dot').find('a').removeClass('active');
		$(this).addClass('active');
	}
	var index = $(this).index();
	$('.galaxy-3column').animate({left: -100 * index +'%'},300);
});



// drop-nav
$(document).on("click",".is-open", function(){
	$(this).hide();
	$(".drop-navigation").css({display:"block"});
})
$(document).on("click",".is-close-menu", function(){
	$(".is-open").show();
	$(".drop-navigation").css({display:"none"});
})

//product-slide__item-hover
var prd = $(".product");
var pdBtn = $(".pd-hover-btn");

prd.hover(function(){
	$(this).find(".product-slide__item").hide();
	$(this).find(".product-slide__item-hover").show();
},function(){
	$(this).find(".product-slide__item-hover").hide();
	$(this).find(".product-slide__item").show();
});

// product slide
var pdCurrent = 0;

$(".product_slide-img").each(function(i){
	$(this).css({left: 100 * i +'%'});
});


function pdSlide(index){
	$(".product_slide-wrap").animate({left: -100 * index +'%'},300);
	pdCurrent = index;
}
$(document).on("click",".product-title li", function(e){
	e.preventDefault();
	//alert($(this).index());
	if( !$(this).hasClass("is-selected")){
		pdSlide($(this).index());
		$(".product-title a").removeClass("is-selected");
		$(this).find("a").addClass("is-selected");
	} 
});