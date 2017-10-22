var user_search = "the office",




    function show_all_gifs(the_button) {
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q='" + user_search + "'&api_key=IzBmA6Dpos0EdfXIav4LTX8PYpp03Nj6&limit=10",
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

    $("body").append("<button>This is a button</button>");


    $("button").on("click", show_all_gifs(this.data));






})