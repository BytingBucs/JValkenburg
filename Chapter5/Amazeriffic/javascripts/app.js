var main = function (toDoObjects){
	"use strict";
	
	var toDos = toDoObjects.map(function(toDo){
		return toDo.description;
	});
	
	$(".tabs a span").toArray().forEach(function(element){
		var $element = $(element);
		
		$element.on("click", function(){
			$(".tabs span").removeClass("active");
			$(element).addClass("active");
			$("main .content").empty();
			return false;
		});
	
	});
}