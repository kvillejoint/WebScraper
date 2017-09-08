//collect article info as json
$.getJSON("/articles", function(data) {
    //for each article, append to page
    for (var i=0; i<data.length; i++) {
        
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
    console.log(data);



    //save data in variable, then call info from new variable for below part


});

//click listener for users clicking on p tag
$(document).on("click", "p", function() {
    console.log("Clicked on paragraph");
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
        console.log(this);
        //add article title
        $("#users").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#users").append("<input id='titleinput' name='title' >");
        // A textarea to add a new users body
        $("#users").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new users, with the id of the article saved to it
        $("#users").append("<button data-id='" + data._id + "' id='saveusers'>Save users</button>");

        // If there's a users in the article
        if (data.users) {
        // Place the title of the users in the title input
        $("#titleinput").val(data.users.title);
        // Place the body of the users in the body text area
        $("#bodyinput").val(data.users.body);
      }
    });
});

// When you click the save users button
$(document).on("click", "#saveusers", function() {
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
        $("#users").empty();
      });
  
    // Also, remove the values entered in the input and textarea for users entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });