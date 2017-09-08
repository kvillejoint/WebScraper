// Dependencies
let express = require("express");
let bodyParser = require("body-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
// Require Article and Users models
let Article = require("./models/Article.js");
let Users = require("./models/Users.js");
// Scraping tools
let request = require("request");
let cheerio = require("cheerio");
// Set moongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
let app = express();
// Use morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
// Make the static directory public
app.use(express.static("public"));
// database configuration with mongoose
mongoose.connect("mongodb://localhost/week18day3mongoose");
let db = mongoose.connection;
// show mongoose errors
db.on("error", function(error) {
    console.log("Mongoose error: ", error);
});

// console log to show successful mongoose connection
db.once("open", function() {
    console.log("Mongoose connected successfully.");
});

//Routes

//GET reuest to scrape ny times website
app.get("/scrape", function(req, res) {
    ///request to pull body of html
    request("https://www.nytimes.com/", function(error, response, html) {
        //load html body into cheerio for requesting. Save as $ for use as shorthand selector
        let $ = cheerio.load(html);
        //grab html h2 tag to update results
        $("article h2").each(function(i, element) {
                //empty object for results
                let result = {};
                //create text and href for each link and save as properties of result object
                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");
                //Create new entry using Aticle model
                let entry = new Article(result);
                //save entry to the database
                entry.save(function(err, doc) {
                    //log any errors
                    if (err) {
                        console.log(err);
                    }
                    //else log the document
                    else {
                        console.log(doc);
                    }
                });
            });
        });
        //send results to browser when finished scraping the text.
        res.send("Scrape complete");
    });

    // Get request the scraped articles from mongoDB
    app.get("/articles", function(req, res) {
    
      // TODO: Finish the route so it grabs all of the articles
    Article.find({}, function(error, doc) {
      if (error) {
        res.send(error);
      } else {
        res.json(doc);
      }
    });
    
    });
    
    // This will grab an article by it's ObjectId
    app.get("/articles/:id", function(req, res) {
      // Use req.params.id to find one article
    Article.findOne({ " _id": req.params.id})
      // Run the populate method with "note",
      .populate("note")
      // Respond with the article with the note included
      .exec(function(error, doc) {
        if (error) {
          res.send(error);
        }
        else {
          res.json(doc);
        }
      });
    });
    
    // Post request to create a new note or replace an existing note
    app.post("/articles/:id", function(req, res) {  
        // Create and then save the new note that gets posted to the Notes collection. Pass req.body to the article entry
        let newNote =  new Note(req.body);
        newNote.save(function(error, doc) {
            //log errors
            if (error) {
                console.log(error);
            }
            else {
                Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
                // Execute the above query
                .exec(function(err, doc) {
                  // Log any errors
                  if (err) {
                    console.log(err);
                  }
                  else {
                    // Or send the document to the browser
                    res.send(doc);
                  }
                });
              }
            });
          });

/*       
    // and update it's "note" property with the _id of the new note
    Article.findOneAndUpdate({}, { $push: { "note": doc._id } }, {new: true }, function(error, doc) {
      if (error) {
        res.send(error);
      }
      else {
        res.json(doc);
      }
    });
    
    });   
*/

    // Listen on port 4000
    app.listen(4000, function() {
      console.log("App running on port 4000!");
    });
