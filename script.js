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

        featherEditor.launch({
            image: image.id,
            url: image.src
        });
    });
});