// This goes through all of the buttons on the UI and shows the buttons from the user choices array.
function show_all_buttons(array) {
    $("#buttons").empty();
    $.each(array, function(index, search) {
        $("#buttons").append("<button class='btn btn-primary' data-name='" + search + "'>" + search + "</button>");
    })
}

// The original choices for the user to click and see the GIFs
var user_choices = ["the office", "dogs", "cats", "pandas"];

// This will be used to make the API call to populate the page with the GIFs
function show_all_gifs(the_button) {
    $(".gif_display").empty();
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q='" + the_button + "'&api_key=IzBmA6Dpos0EdfXIav4LTX8PYpp03Nj6&limit=12",
        method: "GET"
    }).done(function(returned) {
        // Establishes the returned object to be something easier to deal with.
        var the_gifs = returned.data;
        // GO through all of the data this is returned
        the_gifs.forEach(function(gif) {
            // Make sure that the rating isn't R or PG-13
            if (gif.rating !== "r" && gif.rating !== "pg-13") {
                // Make a DIV for the GIF to be appended
                var gif_div = $("<div class='forGifs'>");
                var gif_img = $("<img/>");
                // Give all the attributes to the UI 
                gif_img.attr({
                    src: gif.images.fixed_height_small.url,
                    data_still: gif.images.original_still.url,
                    data_animate: gif.images.fixed_height_small.url,
                    data_state: "animate"

                });
                // Append the new object to the UI
                $(gif_div).append(gif_img);
                // Add some text to the bottom that shows the Rating
                $(gif_div).append("<h5>Rating: " + gif.rating.toUpperCase() + "</h5>");
                $(".gif_display").append(gif_div);
            }
        })
    })
};

$(document).ready(function() {
    // Populate the top of the page with the buttons
    show_all_buttons(user_choices);

    // When we click on the button, show the gifs that have to do with that button.
    $("#buttons").on("click", "button", function() {
        // Normalze the input of the buttons data.
        var search_term = $(this).data("name").split(' ').join('_');
        show_all_gifs(search_term);

    });


    // Add the input in the search bar to the top of the UI
    $("#add_input").on("click", function(event) {
        event.preventDefault();
        var user_input = $("#user_added_term").val();
        user_choices.push(user_input)
        show_all_buttons(user_choices);
        $("#user_added_term").val("");
    })

    $('#add_input').keypress(function(e) {
        if (e.which == 13) {
            $('#add_input').click();
        }
    });



    $(".gif_display").on("click", ".forGifs img", function() {
        var state = $(this).attr('data_state');

        if (state === 'animate') {
            $(this).attr('src', $(this).attr('data_still'));
            $(this).attr('data_state', 'still');
        } else if (state == "still") {
            $(this).attr('src', $(this).attr('data_animate'));
            $(this).attr('data_state', 'animate');
        }


    });

});