$(document).ready(function() {
	var aninmalArray=["Lions","Leopards"];
	//console.log(aninmalArray);
	

	function animalsName() {
		var animalName = $(this).attr(data-name);
	}

	function createAnimalsbuttons(){
		// Deleting the animals prior to adding new animal
        // (this is necessary otherwise we will have repeat buttons)
        $("#animalButtons").empty();

        // Looping through the array of animals
        for (var i = 0; i < aninmalArray.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of animal to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-animal", aninmalArray[i]);
          // Providing the initial button text
          a.text(aninmalArray[i]);
          // Adding the button to the HTML
          $("#animalButtons").append(a);
        }
    }

    //$(document).on("click", ".aninmalArray", animalsName)
    createAnimalsbuttons();

		$("#addAnimal").on("click", function(event) {
	        // Preventing the buttons default behavior when clicked (which is submitting a form)
	        event.preventDefault();
	        // This line grabs the input from the textbox
	        var animal = $("#animalInput").val().trim();

	        // Adding input to array
	        aninmalArray.push(animal);
	        console.log(aninmalArray);
	        // Calling createButtons which processes the animal array
	        createAnimalsbuttons();

	      });


		$("#animalButtons").on("click", function(event){
		var animal2 = $(this).attr(data-animal);

		console.log(animal2);
	      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        animal2 + "&api_key=dc6zaTOxFJmzC&limit=10";

	      $.ajax({
	          url: queryURL,
	          method: "GET"
	        })
		        .done(function(response) {
		        	var results = response.data;

		          for (var i = 0; i < results.length; i++) {
		            var gifDiv = $("<div class='item'>");

		            var rating = results[i].rating;

		            var p = $("<p>").text("Rating: " + rating);

		            var animalImage = $("<img>");
		            animalImage.attr("src", results[i].images.fixed_height.url);

		            gifDiv.prepend(p);
		            gifDiv.prepend(animalImage);

		            $("#giphyAppearshere").prepend(gifDiv);
		        	}
		        }) 
		          
	    });
})
