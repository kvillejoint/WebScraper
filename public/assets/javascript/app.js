//collect article info as json
$.getJSON("/articles", function(data) {
    //for each article, append to page
    for (var i=0; i<data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

//click listener for users clicking on p tag
$(document).on("click", "p", function() {
    //empty notes section
    $("#notes").empty();
    //save id from p tag
    let thisId = $(this).attr("data-id");

    //ajax call for article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    //add note info to page when done
    .done(function(data) {
        console.log(data);
        //add article title
        $("#comment").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
      $("#comment").append("<input id='titleinput' name='title' >");
      // A textarea to add a new comment body
      $("#comment").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new comment, with the id of the article saved to it
      $("#comment").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");

      // If there's a comment in the article
      if (data.comment) {
        // Place the title of the comment in the title input
        $("#titleinput").val(data.comment.title);
        // Place the body of the comment in the body text area
        $("#bodyinput").val(data.comment.body);
      }
    });
});

// When you click the save comment button
$(document).on("click", "#savecomment", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .done(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#comment").empty();
      });
  
    // Also, remove the values entered in the input and textarea for comment entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });