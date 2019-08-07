$(document).ready(function() {

	var topics = ["Goku", "Gohan", "Vegeta", "Piccolo", "Frieza", "Master Roshi", "Trunks", "Majin Buu", "Goten", "Krillin"]
	var results;
	//var giphyURL = "https://api.giphy.com/v1/gifs/trending?api_key=FksXZxJtNgMhBh9yoAtA6sJfP13eNyd4";
	
		// MAKE BUTTONS	AND ADD ONCLICK FUNCTION
	
		function makeButtons() {
	
			$("#dbz-buttons").empty();
	
			for (i = 0; i < topics.length; i++) {
				
				var button = $("<button>");
	
				button.addClass("character-btn");
				button.attr("data-name", topics[i]);
				button.text(topics[i]);
	
				$("#dbz-buttons").append(button);
			};
		};
	
		$("#add-character").on("click", function(event) {
	
			event.preventDefault();
	
			var character = $("#dbz-input").val().trim();
	
			topics.push(character);
			$("#dbz-input").val("");
	
			makeButtons();
	
			console.log(topics);
		});
	
		makeButtons();
	
		//FUNCTION FOR GRABBING GIPHY API CONTENT
	
		  function dataPull() {
	
			 var characterName = $(this).attr("data-name");
			 var characterStr = characterName.split(" ").join("+");
			 var giphyURL = `https://api.giphy.com/v1/gifs/search?q="${characterStr}&api_key=dc6zaTOxFJmzC&limit=10`
	
			 $.ajax({
			url: giphyURL,
			method: "GET"
		  }).done(function(response) {
			
			console.log(giphyURL);
			console.log(response);
	
			results = response.data;
	
			$("#gifs").empty();
			for (var i = 0; i < results.length; i++) {
				
				var characterDiv = $("<div>");
				var para = $("<p class='rating'>").text("Rating: " + results[i].rating);
				var characterImage = $("<img>");
	
				para.addClass("rating-text")
				
			  characterImage.addClass("image-gifs")
				characterImage.attr("src", results[i].images.fixed_height_still.url);
				characterImage.attr("data-state", "still");
			  characterImage.attr("data-position", i);
	
				characterDiv.append(para);
			  characterDiv.append(characterImage);
			  characterDiv.addClass("individual-gifs")
	
			  $("#gifs").prepend(characterDiv);
	
			}; //ENDS FOR LOOP
		  }); // ENDS AJAX FUNCTION
	  
		};
	
	  // Use document on click function to apply function for elements AFTER the page has loaded
	
		$(document).on("click", ".character-btn", dataPull);
	
		// ANIMATE GIFS
	
		function gifAnimation() {
		  var state = $(this).attr("data-state");
		  var position = $(this).attr("data-position");
		  position = parseInt(position); 
	
		  console.log(results[position].images.fixed_height.url);
		  console.log(position);
	
		  if (state === "still") {
			console.log("we're here");
			$(this).attr("src", results[position].images.fixed_height.url);
			$(this).attr("data-state", "animate");
		  } else {
			$(this).attr("src", results[position].images.fixed_height_still.url);
			$(this).attr("data-state", "still");
		  }
		};
	
	  $(document).on("click", ".image-gifs", gifAnimation);
	
	}); //document.ready 
	
	