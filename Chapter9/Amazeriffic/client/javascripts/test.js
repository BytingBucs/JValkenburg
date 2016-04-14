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
		"content": function(){
			$.get("todos.json", function(toDoObjects){
				var $content;
			
				$content = $("<ul>");
				for(i = toDos.length-1; i>=0; i--){
					$content.append($("<li>").text(toDos[i]));
				}
				$("main .content").append($content);
			});
		}
	});
	
	tabs.push({
		"name":"Oldest ",
		"content": function(){
			$.get("todos.json", function(toDoObjects){
				var $content;
				$content = $("<ul>");
				
				toDos.forEach(function(todo){
				$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);
			});
		}
	});
	
	tabs.push({
		"name":"Tags ",
		"content": function(){
			$.get("todos.json", function(toDoObjects){
				var tags = [];
						
					toDoObjects.forEach(function (toDo){
						toDo.tags.forEach(function (tag){
							if(tags.indexOf(tag) === -1) {
								tags.push(tag);
							}
						});
					});
						
					var tagObjects = tags.map(function (tag) {
						var toDosWithTag = [];
						toDoObjects.forEach(function(toDo){
							if (toDo.tags.indexOf(tag) !== -1){
								toDosWithTag.push(toDo.description);
							}
						});
						return {"name": tag, "toDos": toDosWithTag };
					});				
					tagObjects.forEach(function(tag){
						var $tagName = $("<h3>").text(tag.name),
							$content = $("<ul>");
							
						tag.toDos.forEach(function(description){
							var $li = $("<li>").text(description);
							$content.append($li);
						});
							
						$("main .content").append($tagName);
						$("main .content").append($content);
					});
			});
		}
	});
	
		tabs.push({
		"name":"Add",
		"content":function(){
			$.get("todos.json", function(toDoObjects){
			var $input = $("<input>").addClass("description"),
					$inputLabel = $("<p>").text("Description: "),
					$tagInput = $("<input>").addClass("tags"),
					$tagLabel = $("<p>").text("Tags: "),
					$button = $("<button>").text("+");

                $button.on("click", function () {
                    var description = $input.val(),
						tags = $tagInput.val().split(","),
						newToDo = {"description":description, "tags":tags};
					
					
					$.post("todos", newToDo, function(result){
						$input.val("");
						$tagInput.val("");
						
						$(".tabs a:first span").trigger("click");
					});
					
				});
				$content = $("<div>").append($inputLabel)
										.append($input)
										.append($tagLabel)
										.append($tagInput)
										.append($button);
				$("main .content").append($content);
				return $content;
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
			
			$content = tab.content();
			
			$("main .content").append($content);
			return false;
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