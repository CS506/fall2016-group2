// Get the modal
var modal = document.getElementById("myModalNew");
var bucket = document.getElementById("form_wrapper");

// Get the button that opens the modal
var btn = document.getElementById("newPost");
var bucketbtn = document.getElementById("newBucket");

// Get the <span> element that closes the modal
var postspan = document.getElementsByClassName("postclose")[0];
var bucketspan = document.getElementsByClassName("bucketclose")[0];
var home = document.getElementById("home");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

bucketbtn.onclick = function () {
  bucket.style.display = "block";
};

function clickedbucket (el) {
  var bucketclass = $(el).attr("class");
  document.getElementsByClassName(bucketclass)[0].className = "clickedbucket";
  var bucketdiv = document.getElementsByClassName("clickedbucket")[0];
  bucketdiv.style.padding = "0%";
  bucketdiv.style.margin = "0%";
  bucketdiv.style.position = "relative";
  bucketdiv.style.height = "100%";
  bucketdiv.style.width = "98%";
  bucketdiv.style.overflow = "auto";
  bucketdiv.style.zIndex = "2";
  bucketdiv.style.display = "block";
  bucketdiv.style.borderRadius = "0";
  bucketdiv.style.background = "none";
  bucketdiv.style.textAlign = "left";
  hideBuckets();
}

function hideBuckets () {
  var buckethide = document.getElementsByClassName("hoverbucket");
  var i;
  for (i = 0; i < buckethide.length; i++) {
    buckethide[i].style.display = "none";
  }
  var drop = document.getElementsByTagName("svg");
  for (i = drop.length - 1; i >= 0; i--) {
    drop[i].parentNode.removeChild(drop[i]);
  }
}

// When the user clicks on <span> (x), close the modal
postspan.onclick = function () {
  modal.style.display = "none";
};

bucketspan.onclick = function () {
  bucket.style.display = "none";
};

home.onclick = function () {
  window.location.reload(true);
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  } else if (event.target === bucket) {
    bucket.style.display = "none";
  }
};

function countChar (val) {
  var len = val.value.length;
  if (len >= 160) {
    val.value = val.value.substring(0, 160);
  } else {
    $("#charNum").text(160 - len);
  }
}

$("#deadline").click(function () {
  var isdeadline = $("#deadline").is(":checked");
  if (isdeadline) {
    $("#dateTimePicker").css("display", "block");
  } else {
    $("#dateTimePicker").css("display", "none");
  }
});

$("#anonymous").click(function () {
  var isChecked = $("#anonymous").is(":checked");
  if (isChecked) {
    isChecked = true;
    document.getElementById("anonymous").body = "true";
  } else {
    isChecked = false;
    document.getElementById("anonymous").body = "false";
  }
});

// Attach a submit handler to the form
$( "#submitPost" ).submit(function( event ) {
 
  // Stop form from submitting normally
  event.preventDefault();
 
  // Get some values from elements on the page:
  var $form = $( this ),
    image = {imageId: $('input[type=file]')[0]},
    url = "/images";
 
  // Send the data using post
  var posting = $.post(url, image);

  posting.done(function( data ) {

    url = $form.attr( "action" );
    var otherContent = $form.serializeArray();
    var content = {};
    jQuery.each( otherContent, function (i, field) {
      content[field.name] = field.value;
    });
    content.imageId = data;

    $.post(url, content);
  });
});
