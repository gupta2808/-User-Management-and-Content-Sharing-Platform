const { trusted } = require('mongoose');
var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    is_profile: {
        type: Boolean,
        required: true,
        default : false
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
    
});
mongoose.model('Image', imageSchema);