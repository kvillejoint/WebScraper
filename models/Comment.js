//require mongoose
const mongoose = require("mongoose");

//create schema
const Schema = mongoose.Schema;

//schema for comments
let CommentSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
});

//coment model for the CommentSchema created
let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;