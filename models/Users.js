//require mongoose
const mongoose = require("mongoose");

//create schema
const Schema = mongoose.Schema;

//schema for users
let UsersSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
});

//coment model for the CommentSchema created
let Users = mongoose.model("Users", UsersSchema);

module.exports = Users;