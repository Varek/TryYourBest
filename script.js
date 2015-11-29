var selectedImage, editedImage, featherEditor;
var vpc = 0, vgc = 0;
var vision_post = [{
                  "location": "https://vision.eyeem.com/photohackday/photos/mock",
                  "retryAfter": 2
                 },{
                  "location": "https://vision.eyeem.com/photohackday/photos/mock",
                  "retryAfter": 2
                 },{
                  "location": "https://vision.eyeem.com/photohackday/photos/mock",
                  "retryAfter": 2
                 },{
                  "location": "https://vision.eyeem.com/photohackday/photos/mock",
                  "retryAfter": 2
                 }];

var vision_get = [{"aestheticsScore":-0.223015968532929865,
                "concepts":["building exterior","architecture","city","built structure","cityscape","outdoors","high angle view","transportation","development","capital cities","city life","crane","harbor","mode of transport","construction","residential district","human settlement","city life","community","international landmark","perspective","composition"]},
                {
                 "aestheticsScore":0.42643565954608365,
                 "concepts":["architecture","building exterior","construction","built structure","development","construction site","building","crane","cable","connection","city","industry","electricity pylon","power line","tower","development","city life","international landmark","residential district","urban","fish-eye lens","perspective","composition"]
                 },
                 {"aestheticsScore":0.26073796696192986,
                  "concepts":["landscape","grass","day","field","rural scene","green color","agriculture","tranquil scene","green","dirt road","hill","outdoors","farm","tranquility","remote","physical geography","adventure","vacation","guidance","sign","fish-eye lens","perspective","composition"]},
                  {"aestheticsScore":-0.27255699443149073,
                  "concepts":["one person","human hand","indoors","part of","close-up","human body part","holding","cropped","human finger","detail","studio shot","love","single object","still life","heart shape","communication","symbol","ideas","sign","information","negative space"]}];

$(document).ready(function() {

    featherEditor = new Aviary.Feather({
        apiKey: '25de736703e14d0abcca0c90abd3f56f',
        onSaveButtonClicked: function() {
            featherEditor.getImageData(function(data) {
                // set image to new data, and close editor
                if (editedImage) {
                    editedImage.attr('src', data);
                }
                featherEditor.close();
                // post to your server, use File API to download it, etc
                finalEditedImage = $('#edited-image');
                finalEditedImage.attr('src', editedImage.attr('src'));
                postToEyeEmVision(finalEditedImage,function(i,d) {
                  $('#twoToThree').attr('disabled',false);
                  setScore($(i),d);
                });
            });

            return false;
        },
        // onSave: function(imageID, newURL) {
        //     editedImage.attr('src', newURL);
        //     featherEditor.close();
        //     console.log(newURL);
        //     finalEditedImage = $('#edited-image');
        //     finalEditedImage.attr('src', editedImage.attr('src'));
        //     postToEyeEmVision(finalEditedImage,function(i,d) {
        //       $('#twoToThree').attr('disabled',false);
        //       setScore($(i),d);
        //     });
        // },
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
        editPhoto(editedImage);

        originalImage = $('#original-image');
        originalImage.attr('src', selectedImage.attr('src'));
        postToEyeEmVision(originalImage, setScore)

    });

    $('#moreEdit').on('click', function(e) {
        editedImage = $('#editable-image');
        editPhoto(editedImage);
    });

    $('#twoToThree').on('click', function(e) {
        $('.stepTwo').addClass('hidden');
        $('.stepThree').removeClass('hidden');
    });

    $('#restart').on('click', function(e) {
        $('.stepThree').addClass('hidden');
        $('.stepOne').removeClass('hidden');
    });
});

function editPhoto (editedImage) {
  featherEditor.launch({
      image: editedImage[0].id,
      url: editedImage[0].src
  });
}

function setScore (image, data) {
  $(image).next().html(data['aestheticsScore']);
  progress = $(image).siblings('.progress').find('.progress-bar');
  percentage = (data["aestheticsScore"] + 1) * 50
  progress.attr('style', "width: " + percentage + "%;")
}

function postToEyeEmVision (image,resultCallback) {
  // $.ajax({
  //   type: 'POST',
  //   url: 'https://vision.eyeem.com/photohackday/photos',
  //   dataType: 'json',
  //   data: image.attr('src'),
  //   headers: { 'Authorization': 'PHOTOHACKDAY-bj04dKxjMwMjFA' },
  //   success: function(data) {
  //     $(image).data('vision-url',data['location']);
  //   }
  // });
  $(image).data('vision-url',vision_post[vpc]['location']);
  vpc = vpc +1;
  return setTimeout(pullEyeEmVision, 3000, image, resultCallback);

}

function pullEyeEmVision (image, resultCallback) {
  // $.ajax({
  //   type: 'GET',
  //   url: $(image).data('vision-url'),
  //   dataType: 'json',
  //   headers: { 'Authorization': 'PHOTOHACKDAY-bj04dKxjMwMjFA' }, // replace me!!!
  //   success: function(data) {
  //     $(image).data('as', data['aestheticsScore']);
  //     resultCallback(image,data);
  //   },
  //   error: function() {
  //     // setTimeout(pullEyeEmVision, 2000, image, resultCallback);
  //   }
  // });
  $(image).data('as', vision_get[vgc]['aestheticsScore']);
  resultCallback(image,vision_get[vgc]);
  vgc = vgc +1;
}