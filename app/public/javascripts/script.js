// Get the modal
var modal = document.getElementById('myModalNew');
var bucket = document.getElementById('form_wrapper');

// Get the button that opens the modal
var btn = document.getElementById("newPost");
var bucketbtn = document.getElementById("newBucket");

// Get the <span> element that closes the modal
var postspan = document.getElementsByClassName("postclose")[0];
var bucketspan = document.getElementsByClassName("bucketclose")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

bucketbtn.onclick = function () {
    bucket.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
postspan.onclick = function () {
    modal.style.display = "none";
}

bucketspan.onclick = function () {
    bucket.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    else if (event.target == bucket) {
        bucket.style.display = "none";
    }
}

function countChar(val) {
    var len = val.value.length;
    if (len >= 160) {
        val.value = val.value.substring(0, 160);
    } else {
        $('#charNum').text(160 - len);
    }
};

$("#deadline").click(function () {
    var isChecked = $('#deadline').is(':checked');
    if (isChecked) {
        $("#dateTimePicker").css("display", "block");
    }
});

$("#submit").click(function () {
    var startDateTime = new Date($("input[name=startDateTime]").val());
    var endDateTime = new Date($("input[name=endDateTime]").val());
    var currentDate = new Date();
    var startTime = startDateTime.toTimeString();
    var endTime = endDateTime.toTimeString();
    var startDate = startDateTime.toDateString();
    var endDate = endDateTime.toDateString();
    //console.log(startDateTime);
    if (startDateTime != "Invalid Date") {
        if (startDateTime > currentDate) {
            //console.log(startDate + " " + currentDate);
            if (startDateTime < endDateTime) {
                alert("success");
            }
            else {
                alert("Start date should be before end date");
            }
        } else {
            alert("Start date should be after current date");
        }
    }
});
