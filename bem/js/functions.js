$('.menu-btn').on('click', function(e){
	e.preventDefault();
	$(this).toggleClass('menu-btn_active');
	$('.menu').toggleClass('menu_active');
	$('.products').toggleClass('products_active');
})