var main = function(toDoObjects){
	var toDos, 
		tabs;
	toDos= toDoObjects.map(function(toDo){
			return toDo.description;
		});
	tabs = [];
		
	tabs.push({
		//name of tab
		"name":"Newest ",
	
		//functionality
		"content": function(callback){
			$.get("todos.json", function(toDoObjects){
				var $content;
			
				$content = $("<ul>");
				for(i = toDos.length-1; i>=0; i--){
					$content.append($("<li>").text(toDos[i]));
				}
				//$("main .content").append($content);
				callback($content);
			});
		}
	});
		tabs.forEach(function (tab){
			var $aElement = $("<a>").attr("href",""),
				$spanElement = $("<span>").text(tab.name);
				
			$aElement.append($spanElement);
			
			$spanElement.on("click", function(){
				var $content;
				
				$(".tabs a span").removeClass("active");
				$spanElement.addClass("active");
				$("main .content").empty();
				
				tab.content(function ($content) {
					$("main .content").append($content);
				});
				
				//$content = tab.content();
				
				/*$("main .content").append($content);
				return false;*/
		});
		$("main .tabs").append($aElement);
	});
	
/*	console.log("hello")
	console.log(toDos);
	console.log(tabs);*/

};
$(document).ready(function(){
	$.getJSON("todos.json", function(toDoObjects){
		main(toDoObjects);
	});
});