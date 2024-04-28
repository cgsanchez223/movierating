function clearError() {
    $("#message").text('');

    $("#movieTitle").prev().removeClass('error');
    $("#movieRating").prev().removeClass('error');
    $("#message").removeClass('error');
}

function formEntry() {

    let newEntries = false;
    let movieTitle = $("#movieTitle").val();

    if(movieTitle) {
        // Need to prevent invalid title entries.
        if(movieTitle.length > 1) {
            newEntries = true;
        } else {
            $("#message").text('Movie titles must be at least 2 characters');
            $("#movieTitle").prev().addClass('error');
        }
    } else {
        $("#message").text('Movie titles must be at least 2 characters');
        $("#movieTitle").prev().addClass('error');
    }
        // Need to prevent invalid ratings
    if (newEntries) {

        newEntries = false;

        let rating = 0 + $("#movieRating").val();

        if((rating > 0) && (rating <= 10)) { // changed minimum requirment to zero since I want to give them star icons
            newEntries = true;
        } else {
            $("#message").text('Movie rating must be between 1 and 10');
            $("#movieRating").prev().addClass('error');
        }
    }

    return newEntries;
}


function newString(rateIn) {
    let rateOut = ("&#x2B50;").repeat(Math.round(rateIn)); // https://www.htmlsymbols.xyz/unicode/U+2B50 - puts star icons in to represent rating

    return rateOut;
};


// adds new entry to list and summons button to remove entry as well
$("#add").on("click", function(e) {

    e.preventDefault();

    clearError();

    if(formEntry()) {
        let movieEntry = `"${$("#movieTitle").val()}"&nbsp;&nbsp;`
        movieEntry = movieEntry + ` ${newString($("#movieRating").val())}`

        let $movieList = $("<div>").html(movieEntry).addClass("divx");
        $("<button>").text("Delete").addClass("remove").appendTo($movieList);
        $(".movies").append($movieList);

        $('input').val('');
    }
});

// for deleting entry
$(".movies").on("click", ".remove", function() {
    $(this).parent().remove();
});