//Require mongoose
let mongoose = require("mongoose");
//create schema clas
let Schema = mongoose.Schema;
//create article schema
let ArticleSchema = new Schema({
    //title as string
    title: {
        type: String,
        required: true
    },
    //HTML link  as string
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

//create mongoose model with ArticleSchema
let Article = mongoose.model("Article", ArticleSchema);

//export model
module.exports = Article;