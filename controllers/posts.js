
const path = require('path');
var mongoose = require('mongoose');
var Post = mongoose.model('Post'); 
const User = mongoose.model('User');
module.exports.posts = async function(req, res){
    try{

        var post = new Post();

        var user = await User.findById(req.userData._id);


        user.posts.push(post._id);

        jsonData = req.userData;
        post.content = req.body.content;
        post.user = jsonData._id;
        post.private = req.body.private;

        await Promise.all([
            post.save(),
            user.save()
        ]);

        res.status(200).json({
            post,
        });

    } catch(error){

        res.status(400).json({
            message : error.message,
            error
        })
    }
}



module.exports.getAllPostsOfUser = async function(req, res){
    try{

        var jsonData = req.userData;
        const page= req.query.page;
        const limit= req.query.limit;
        var user = await User.findById(jsonData._id);

        if(!user)
            return res.status(404).json({
                message : 'Invalid User!',
                error :  {}
            });
        
        const posts = await Post.find({})
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();

        res.status(200).json({
            message : "all images of user",
            posts
        })

    }catch(err){

        res.status(400).json({
            message : err.message,
            err
        });

    }
}