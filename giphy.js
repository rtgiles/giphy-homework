$(document).ready(function() {
	var animalArray=["Lions","Leopards"];
	var animalArray2=[];
	//console.log(aninmalArray);
	

	// function animalsName() {
	// 	var animalName = $(this).attr(data-name);
	// }

	function createAnimalsbuttons(){
		// Deleting the animals prior to adding new animal
        // (this is necessary otherwise we will have repeat buttons)
        $("#animalButtons").empty();

        // Looping through the array of animals
        for (var i = 0; i < animalArray.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of animal to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-animal", animalArray[i]);
          // Providing the initial button text
          a.text(animalArray[i]);
          // Adding the button to the HTML
          $("#animalButtons").append(a);
        }
    }

    
    createAnimalsbuttons();

		$("#addAnimal").on("click", function(event) {
	        // Preventing the buttons default behavior when clicked (which is submitting a form)
	        event.preventDefault();
	        // This line grabs the input from the textbox
	        var animal = $("#animalInput").val().trim();

	        // Adding input to array
	        animalArray.push(animal);
	        console.log(aninmalArray);
	        // Calling createButtons which processes the animal array
	        createAnimalsbuttons();

	      });


		$(document.body).on("click", ".animal", function(event){
			var animal2 = $(this).attr("data-animal");

			//console.log(animal);
		    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		      animal2 + "&api_key=dc6zaTOxFJmzC&limit=10";

		      $.ajax({
		          url: queryURL,
		          method: "GET"
		        })
		        .done(function(response) {
		        	var results = response.data;
		        	//console.log(response.data);
		        	//console.log(results);
		          for (var i = 0; i < results.length; i++) {
		            var gifDiv = $("<div class='item'>");

		            var rating = results[i].rating;

		            var p = $("<p>").text("Rating: " + rating);

		            var animalImage = $("<img>");
		            animalImage.attr("src", results[i].images.fixed_height.url);
		            animalImage.attr("data-state", "animate");
		            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
		            animalImage.attr("data-animate", results[i].images.fixed_height.url);
		            animalArray2.push(animalImage);
		            console.log(animalArray2); 

		            gifDiv.prepend(p);
		            gifDiv.prepend(animalArray2[i]);

		            $("#giphyAppearshere").prepend(gifDiv);
		            }
		        }) 
		    $(document.body).on("click", ".item", function(event){
		            	var state = $(this).attr("data-state");
					      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
					      // Then, set the image's data-state to animate
					      // Else set src to the data-still value
					      if (state === "animate") {
					        $(this).attr("src", $(this).attr("data-still"));
					        $(this).attr("data-state", "still");
					      } else {
					        $(this).attr("src", $(this).attr("data-animate"));
					        $(this).attr("data-state", "animate");
					      }
		            	
		            });      
	    });
})


