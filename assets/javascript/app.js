$(document).ready(function(){
console.log("Page Loaded");

var searchMovies = ["American Sniper","Lone Survivor","Assassin's Creed","Guardians of the Galaxy",
"Transformers","Planet of th Apes","Avengers","Thor","Spider-Man","Suicide Squad"];

function addTheseButtons(searchMovies,classToAdd,addToArea){
	console.log("Hit the function",searchMovies);
	// $("#addToArea").empty();
	for (var i = 0; i < searchMovies.length; i++) {
		var button = $("<button>");
		button.addClass(classToAdd);
		button.attr("data-type",searchMovies[i]);
		button.text(searchMovies[i]);
		console.log(button);
		$("#addToArea").append(button);
	}
}
$("#theButton").on("click",function(){
	console.log("working");
	var type = $(this).data("type");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC&limit=20";
	$.ajax({url:queryURL,method:"GET"})
	.done(function(response){
		for (var i = 0; i < response.data.length; i++) {
				var searchDiv = $("<div class='search-item'>");
				var rating =response.data[i].rating;
				var p = $("<p>").text("Rating: " +rating);
				var animated = response.data[i].images.fixed_height.url;
				var still = response.data[i].images.fixed_height_still.url;
				var image = $("<img>");
				image.attr("src",still);
				image.attr("data-still",still);
				image.attr("data-animated",animated);
				image.attr("data-state","still");
				image.addClass("searchImage");
				searchDiv.append(p);
				searchDiv.append(image);
				$("#movies").append(searchDiv);
			}	
	})	

})
$(".searchImage").on("click","searchImage",function(){
	var state = $(this).data("state");
	if(state == "still"){
		$(this).attr("src",$(this).data("animated"))
		$(this).attr("data-state","still");
	}
})
$(addSearch).on("click",function(){
	var newSearch = $("input").eq(0).val();
	searchMovies.push(newSearch);
	addTheseButtons(searchMovies,"submitButton","#movieButton");
	return false;
})

addTheseButtons(searchMovies,"submitButton","#movieButton")
});



