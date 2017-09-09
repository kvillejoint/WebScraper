//collect article info as json
$.getJSON("/articles", function(data) {
    //for each article, append to page
    for (var i=0; i<data.length; i++) {
        
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
    console.log(data);



    //save data in variable, then call info from new variable for below part


});

//click listener for notes clicking on p tag
$(document).on("click", "p", function() {
    console.log("Clicked on paragraph");
    //empty notes section
    $("#notes").empty();
    //save id from p tag
    let thisId = $(this).attr("data-id");
    console.log(thisId)
    //ajax call for article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    //add note info to page when done
    .done(function(data) {
        console.log(data);
        console.log(this)
        //add article title
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new notes body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new notes, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenotes'>Save Note</button>");

        // If there's a notes in the article
        if (data.notes) {
        // Place the title of the notes in the title input
        $("#titleinput").val(data.notes.title);
        // Place the body of the notes in the body text area
        $("#bodyinput").val(data.notes.body);
      }
    });
});

// When you click the save notes button
$(document).on("click", "#savenotes", function() {
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
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for notes entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
