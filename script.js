$(document).ready(function() {
    var image;

    var featherEditor = new Aviary.Feather({
        apiKey: '<YOUR_KEY_HERE>',
        onSave: function(imageID, newURL) {
            image.src = newURL;
            featherEditor.close();
            console.log(newURL);
        },
        onError: function(errorObj) {
            console.log(errorObj.code);
            console.log(errorObj.message);
            console.log(errorObj.args);
        }
    });


    $('#edit-image-button').click(function(){
        image = $('#editable-image')[0];

        // Set the image and source when the button is clicked.
        // This makes it possible to go back in and edit on top of previous edits.
        featherEditor.launch({
            image: image.id,
            url: image.src
        });
    });
});