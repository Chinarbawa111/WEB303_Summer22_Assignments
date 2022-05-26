/*
	WEB 303 Assignment 1 - jQuery
	Chinar Bawa
*/
$(document).ready(function(){
	$("#price").keyup(function(){
		let insertValue = $("#price").val();
		let calTax = insertValue*0.13;
		$("#tax").text("$"+ calTax.toFixed(2));
	})
	})