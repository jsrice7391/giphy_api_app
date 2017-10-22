var user_search = "the office";

function show_all_buttons(array) {
    $.each(array, function(index, search) {
        $("#buttons").append("<button class='btn btn-primary' data-name='" + search + "'>" + search + "</button>");
    })

}

var user_choices = ["the office", "dogs", "cats", "pandas"];




function show_all_gifs(the_button) {
    $(".gif_display").empty();
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q='" + the_button + "'&api_key=IzBmA6Dpos0EdfXIav4LTX8PYpp03Nj6&limit=10",
        method: "GET"
    }).done(function(returned) {
        var the_gifs = returned.data;
        console.log(the_gifs);
        the_gifs.forEach(function(gif) {

            var gif_div = $("<div class='forGifs'>");
            var gif_img = $("<img/>");
            gif_img.attr({
                src: gif.images.fixed_height_small.url
            });

            console.log(gif.images.downsized_still.url);
            $(gif_div).append(gif_img);

            $(".gif_display").append(gif_div);
        })
    })
};

$(document).ready(function() {
    show_all_buttons(user_choices);

    $("#buttons button").on("click", function() {
        var search_term = $(this).data("name");
        show_all_gifs(search_term);

    })


})