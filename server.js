// Dependencies
let express = require("express");
let bodyParser = require("body-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
// Require Article and Comment models
let Article = require("./models/Article.js");
let Comment = require("./models/Comments.js");
// Scraping tools
let request = require("request");
let cheerio = require("cheerio");
// Set moongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
let app = express();
// Use morgan and body parser
app.use(logger("dev"));
app.use(bodyParer.urlencoded({
    extended: false
}));
// Make the static directory public
app.use(express.static("public"));
// database configuration with mongoose
mongoose.connect("mongodb://localhost/webScraper");
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
app.get("/scrape", function(req, res) {
    request("http://");


});