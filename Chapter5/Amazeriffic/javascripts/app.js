var main = function (toDoObjects){
	"use strict";
	
	var toDos = toDoObjects.map(function(toDo){
		return toDo.description;
	});
	
	var makeTabActive = function (tabNumber)
	{
		//construct the selector from the tabNumber
		var tabSelector = ".tabs a:nth-child(" + tabNumber + ") span";
			$(".tabs span").removeClass("active");
			$(tabSelector).addClass("active");
			$("main .content").empty();
	};	
	$(".tabs a:nth-child(1)").on("click", function(){
		makeTabActive(1);
		return false;
	});
	
	$(".tabs a:nth-child(2)").on("click", function(){
		makeTabActive(2);
		return false;
	});
	
	$(".tabs a:nth-child(3)").on("click", function(){
		makeTabActive(3);
		return false;
	});
	
	$(document).ready(function(){
		$.getJSON("todos.json", function(){
			main(toDoObjects);
		});
	});
}