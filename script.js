var featherEditor = new Aviary.Feather({
    apiKey: '<YOUR_KEY_HERE>',
    onSave: function(imageID, newURL) {
        var img = document.getElementById(imageID);
        img.src = newURL;
        featherEditor.close();
        console.log(newURL);
    },
    onError: function(errorObj) {
        console.log(errorObj.code);
        console.log(errorObj.message);
        console.log(errorObj.args);
    },
    //tools: ['crop'],
    // cropPresets: [
    //     ['Size 1', '200x400'],
    //     ['Size 2', '400x600']
    // ],
    // theme: 'light'
});

function launchEditor(id, src) {
    featherEditor.launch({
        image: id,
        url: src
    });
}

$('#edit-image-button').click(function(){
    alert('Oy');
});