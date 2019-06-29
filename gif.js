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
        console.log(response);
       
        //variable to hold results
        var results = response.data;
        console.log(results);


        //creating div containing gif and rating for each item in results array
        for(var i = 0; i < results.length; i++) {

            //div to hold gif and rating content
            var gifContent = $('<div class="gif-content">');
            console.log('gif content' + gifContent);
            
            //variable to hold gif still url
            var gif = results[i].images.downsized_still.url;
            console.log(gif);
            
            //variable to hold animated gif url
            var gifAnimate = results[i].images.downsized.url;
            console.log(gifAnimate);
            
            // variable to show gif
            var gifDisplay = $('<img>')
            console.log(gifDisplay);
            
            // add gif class to images
            gifDisplay.addClass("gif");

            //setting source url for gif images
            gifDisplay.attr("src", gif);

            //set attribute for still state
            gifDisplay.attr("data-state", "still");

            //set attribute for data-animate
            gifDisplay.attr("data-animate", gifAnimate);

            //set state for data-still
            gifDisplay.attr("data-still", gif);

            gifDisplay.attr("alt", "tv gif");

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
      
        buttonName.text(topics[i]);
     
        $("#display-buttons").append(buttonName);
    };
};

//click event functions
$("#add-show").on("click", function(e) {
    e.preventDefault();
    // grab input from textbox
    var show = $("#input-show").val().trim();

    // Adding show from the textbox array
    topics.push(show);

    // fuction call to handle buttons in movie array
    createButton();
});

//trying to figure out how to make this piece work in my code
// $(".gif").on("click", function(e) {
//     e.preventDefault();
//     var state = $(this).attr("data-state");
//     if (state === "still") {
//       $(this).attr("src", $(this).attr("data-animate"));
//       $(this).attr("data-state", "animate");
//     } else {
//       $(this).attr("src", $(this).attr("data-still"));
//       $(this).attr("data-state", "still");
//     }
//   });

 // add click function for buttons on page
$(document).on("click", ".show", displayGif);


// ----------------------------------------FUNCTION CALLS-------------------------------------------

createButton()

});