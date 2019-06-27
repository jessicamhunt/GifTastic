$(document).ready(function() {

// -------------------------------- GLOBAL VARIABLES------------------------------------------------

// API Key for GIPHY
// Api Key: 7vUfrLQpKYQim7mTbbeHRt8iuv9URaZf

// GIPHY request URL
//https://api.giphy.com/v1/gifs/search?q=(search-term)&api_key=7vUfrLQpKYQim7mTbbeHRt8iuv9URaZf&limit=10&offset=0&rating=PG-13&lang=en

//save APIkey to variable
var apiKey = '7vUfrLQpKYQim7mTbbeHRt8iuv9URaZf';

//make a list of 10 initial categories for gifs
var topics = ['south park', 'parks and recreation','the office', 'arrested development', 
'adventure time', 'rick and morty','bojack horseman','the simpsons','30 rock'];


//---------------------------------------FUNCTIONS--------------------------------------------------

//function to display gifs and ratings
function displayGif() {
    
    //variable to create attribute with show name as the value for each button
    var tvShow = $(this).attr("show-name");
    console.log(tvShow);
    
    //save GIPHY request URL to a variable
    var queryUrl = 
    'https://api.giphy.com/v1/gifs/search?q=' + tvShow + '&api_key=' + apiKey + '&limit=10&offset=0&rating=PG-13&lang=en';
    
    //connect to GIPHY api
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        console.log('response' + response);
        //variable to hold results
        var results = response.data;
        console.log(results);

        for(var i = 0; i < results.length; i++) {

            //div to hold gif and rating content
            var gifContent = $('<div class="gif-content">');
            console.log('gif content' + gifContent);
            
            //variable to hold gif
            var gif = results[i].images.original.url;
            console.log(gif);
            
            // variable to show gif
            var gifDisplay = $('<img>')
            console.log(gifDisplay);
            
            gifDisplay.attr("src", gif);
            gifDisplay.attr("alt", "tv gif")
            //append gif to gifContent div
            gifContent.append(gifDisplay);
            
            //variable to hold gif rating
            var rating = results[i].rating;
            console.log('rating' + rating);
            
            //variable to display gif rating
            var ratingDisplay = $('<p>').text("Rated: " + rating);
            console.log('rating display' + ratingDisplay);
            
            //append rating display to gifContent div
            gifContent.append(ratingDisplay)
            
            //display gifContent div in html
            $('#gif-display').prepend(gifContent);    
        }
    });
}    
// console.log(displayGif());
// displayGif();


//create buttons for each list item
function createButton(){
    
    $("#display-buttons").empty();
    
    for(var i = 0; i < topics.length; i++) {
      
        var buttonName = $("<button>");
      
        buttonName.addClass("show");
      
        buttonName.attr("show-name", topics[i]);  
      
        //display buttons at the top of the page
      
        buttonName.text(topics[i]);
     
        $("#display-buttons").append(buttonName);
    };
};

//click event functions
$("#add-show").on("click", function(e) {
    e.preventDefault();
    // This line grabs the input from the textbox
    var show = $("#input-show").val().trim();

    // Adding show from the textbox to our array
    topics.push(show);

    // Calling renderButtons which handles the processing of our movie array
    createButton();
});

 // add click function for buttons on page
$(document).on("click", ".show", displayGif);

//display 10 gifs from the GIPHY API according to the category of that button
//display rating for each gif
//gifs should be paused once they are loaded to the page
//gifs should play only when their image is clicked
//gifs should paused if clicked again.

//when a different button is clicked
// clear the gifs from the last button click
//replace with 10 gifs related to the current button click

//when user submits a search
//an additional button is created
//button should display at the end of the list with a name equal to the text of their search. 
//when the user clicks on the new button
//the button should display 10 gifs related to their search

// ----------------------------------------FUNCTION CALLS-------------------------------------------

createButton()

});