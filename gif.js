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

//function to display gifs and ratings
function displayGif() {

    var tvShow = $(this).attr("show-name");
    console.log("tv show" + tvShow);
    
    //save GIPHY request URL to a variable
    var queryUrl = 
    'https://api.giphy.com/v1/gifs/search?q=' + tvShow + '&api_key=' + apiKey + '&limit=10&offset=0&rating=PG-13&lang=en';
    
    //connect to GIPHY api
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        console.log('response' + response);
        
        //div to hold individual gif and rating
        var gifContent = $('<div class="gif-content">');
        console.log('gif content' + gifContent);

        //variable to hold gif
        var gif = response;
        console.log(response);

        // variable to show gif
        var gifDisplay = $('<img>').attr("src", gif);
        console.log(gifDisplay);

        //append gif to gifContent div
        gifContent.append(gifDisplay);

        //variable to hold gif rating
        var rating = response.rating;
        console.log('rating' + rating);

        //variable to display gif rating
        var ratingDisplay = $('<p>').text("Rated: " + rating);
        console.log('rating display' + ratingDisplay);

        //append rating display to gifContent div
        gifContent.append(ratingDisplay)

        //display gifContent div in html
        $('#gif-display').prepend(gifContent);
        
    });
}    
console.log(displayGif());
displayGif();


//create buttons for each list item
function createButton(){
    for(var i = 0; i < topics.length; i++) {
    //   $("#display-buttons").empty();
      var buttonName = $("<button>");
      buttonName.addClass("show");
      buttonName.attr("show-name", topics[i]);  
      //display buttons at the top of the page
      buttonName.text(topics[i]);
      $("#display-buttons").append(buttonName);
    };
};
//when button is clicked
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