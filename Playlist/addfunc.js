$(document).ready(function() {
	$('#btnAdd').on('click', function(){
		var newItem = '<li> new item </li>'
		$('ul').append(newItem);
	});
});