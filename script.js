$(document).ready(function() {
    var originalImageSrc = $('#editable-image').attr('src');
    var currentImage; // assigned when the Edit button is clicked

    var featherEditor = new Aviary.Feather({
        apiKey: '<YOUR_KEY_HERE>',
        onSave: function(imageID, newURL) {
            currentImage.src = newURL;
            featherEditor.close();
            console.log(newURL);
        },
        onError: function(errorObj) {
            console.log(errorObj.code);
            console.log(errorObj.message);
            console.log(errorObj.args);
        }
    });


    // Edit
    $('#edit-image-button').click(function() {
        currentImage = $('#editable-image')[0];

        // Set the image and source when the button is clicked.
        // This makes it possible to go back in and edit on top of previous edits.
        featherEditor.launch({
            image: currentImage.id,
            url: currentImage.src
        });
    });

    // Reset
    $('#reset-image-button').click(function() {
        if ($('#editable-image').attr('src') === originalImageSrc) {
            alert('Nothing to reset.');
        }
        else {
            $('#editable-image').attr('src', originalImageSrc);
        }
    });
});