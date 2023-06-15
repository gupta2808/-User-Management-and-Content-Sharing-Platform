var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    content:{
        type: String,
        required:true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref : "User" ,
        required: true
    },
    private: {
        type: Boolean,
        required: true,
        default : false
    },
    likes: {
        type: Number,
        required: true,
        default : 0
    }

});

mongoose.model('Post', postSchema);