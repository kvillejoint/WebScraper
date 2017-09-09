//require mongoose
const mongoose = require("mongoose");

//create schema
const Schema = mongoose.Schema;

//schema for users
let NotesSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
});

//coment model for the CommentSchema created
let Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;