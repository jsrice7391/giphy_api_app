function show_all_buttons(array) {
    $("#buttons").empty();
    $.each(array, function(index, search) {
        $("#buttons").append("<button class='btn btn-primary' data-name='" + search + "'>" + search + "</button>");
    })
}

var user_choices = ["the office", "dogs", "cats", "pandas"];

function show_all_gifs(the_button) {
    $(".gif_display").empty();
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q='" + the_button + "'&api_key=IzBmA6Dpos0EdfXIav4LTX8PYpp03Nj6&limit=13",
        method: "GET"
    }).done(function(returned) {
        var the_gifs = returned.data;
        console.log(the_gifs);
        the_gifs.forEach(function(gif) {

            if (gif.rating !== "r" && gif.rating !== "pg-13") {
                var gif_div = $("<div class='forGifs'>");
                var gif_img = $("<img/>");
                gif_img.attr({
                    src: gif.images.fixed_height_small.url,
                    data_still: gif.images.original_still.url,
                    data_animate: gif.images.fixed_height_small.url,
                    data_state: "animate"

                });


                console.log(gif.images.downsized_still.url);
                $(gif_div).append(gif_img);
                $(gif_div).append("<h5>Rating: " + gif.rating + "</h5>");


                $(".gif_display").append(gif_div);
            }


        })
    })
};

$(document).ready(function() {
    show_all_buttons(user_choices);

    $("#buttons").on("click", "button", function() {
        var search_term = $(this).data("name").split(' ').join('_');
        show_all_gifs(search_term);

    });

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