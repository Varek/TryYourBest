var selectedImage, editedImage;
$(document).ready(function() {

    var featherEditor = new Aviary.Feather({
        apiKey: '25de736703e14d0abcca0c90abd3f56f',
        onSave: function(imageID, newURL) {
            editedImage.attr('src', newURL);
            featherEditor.close();
            console.log(newURL);
        },
        onError: function(errorObj) {
            console.log(errorObj.code);
            console.log(errorObj.message);
            console.log(errorObj.args);
        }
    });

    // Evercam
    Evercam.prepApiAuth('ceee383f','30c36cde3b1e5b37bdcf776e6379069b');

    $('.img-select').on('click', function(e) {
        $('.img-select').removeClass('selected');
        $(this).addClass('selected');
    });

    $('#oneToTwo').on('click', function(e) {
        $('.stepOne').addClass('hidden');
        $('.stepTwo').removeClass('hidden');
        selectedImage = $('.img-select.selected').first();
        editedImage = $('#editable-image');
        editedImage.attr('src', selectedImage.attr('src'));
        // Set the image and source when the button is clicked.
        // This makes it possible to go back in and edit on top of previous edits.
        featherEditor.launch({
            image: editedImage[0].id,
            url: editedImage[0].src
        });
    });

    $('#TwoToThree').on('click', function(e) {
        $('.stepTwo').addClass('hidden');
        $('.stepThree').removeClass('hidden');
    });
});

function postToEyeEmVision (image) {
  $.ajax({
    type: 'POST',
    url: 'https://vision.eyeem.com/photohackday/photos',
    dataType: 'json',
    data: newdata,
    headers: { 'Authorization': 'PHOTOHACKDAY123' }, // replace me!!!
    success: function(data) {
      $(image).data('vision-url',data['location']);
    };
  });
  setTimeout(pullEyeEmVision, 3000, image);
}

function pullEyeEmVision (image) {
  $.ajax({
    type: 'GET',
    url: $(image).data('vision-url'),
    dataType: 'json',
    headers: { 'Authorization': 'PHOTOHACKDAY123' }, // replace me!!!
    success: function(data) {
      $(image).data('as', data['aestheticsScore']);
    },
    error: function() {
      setTimeout(pullEyeEmVision, 2000, image);
    };

  });

}