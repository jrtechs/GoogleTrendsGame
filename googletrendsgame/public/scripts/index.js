// ==========================
// Login
// ==========================

// Enter Button
$(document).ready(function() {

	$('#userNickname').on('change', function(){
		if($(this).val()) {
			$('.button--enter').addClass('is--active');
		} else {
			$('.button--enter').removeClass('is--active');
		}
	});

});