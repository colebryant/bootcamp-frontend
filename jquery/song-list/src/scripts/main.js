$(document).ready(function() {

    // Use jQuery to get a reference to `load-songs`
    let button = $("#load-songs");
    // Use jQuery to get a reference to `song-list`
    let article = $("#song-list");
    /*
        Attach a click handler to the button with jQuery. When
        the button is clicked, use $.ajax() to load `songs.json`
        from the file system
    */

    button.click( () => {
        $.ajax({url: "http://localhost:8088/songs", success: (result) => {
            console.log(result);
        }})
        .then(parsedResponse => {
            parsedResponse.forEach(song => {
                console.log(song.title);
                const songContainer = $("<section>").addClass("song");
                console.log(songContainer);
                const header = $("<h1>").addClass("song__title").text(song.title);

                const description = $("<section>").addClass("song__description").text(`Performed by ${song.artist} on the album ${song.album}`);

                songContainer.append(header);
                songContainer.append(description);
                article.append(songContainer);
            });
        });
    });

    /*
        Chain a `.then()` method to the ajax call, and when
        it is complete build a DOM component for each song with
        the following structure. Use the jQuery append() method
        to put an HTML representation of each song the DOM as a
        child component of the .

            <section class="song">
                <h1 class="song__title">{Title of song}</h1>
                <section class="song__description">
                    Performed by {artist} on the album {album}
                </section>
            </section>
    */
});