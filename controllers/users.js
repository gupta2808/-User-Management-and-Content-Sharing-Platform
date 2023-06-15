
const path = require("path");
var mongoose = require('mongoose');
const { stringify } = require('querystring');
var User = mongoose.model('User');
var Image = mongoose.model('Image');
var Post = mongoose.model('Post');
// module.exports.getUser = async function(req, res){
//     try{
//         const jsonData = req.userData;

//         let query = User.findOne({_id: jsonData._id})
//         .select(["name","email","role","_id"]);

//         if(req.query.posts)
//             query = query.populate('');

//         if(req.query.images)
//             query = query.populate('images');

//         const user = await query;
        
//            var user = await User.findOne({_id: jsonData._id})
//           .populate('posts')
//           .populate('images')
//           .exec();
        
//         res.status(200).json({
//             user
//         });

//     }
//     catch(error){
//         res.status(404).json({
//             message : error.message,
//             error : error
//         });
//     };

// }

module.exports.getUser = async function(req, res){
    try{
        const jsonData = req.userData;

        let user = await User.findOne({_id: jsonData._id})
            .select(["name","email","role","_id","posts","images"]);

        user = JSON.parse(JSON.stringify(user));

        user.posts = await Promise.all(user.posts.map(postId =>{

            return Post.findById(postId);

        }));
        // user.posts = JSON.parse(JSON.stringify(user.posts));
        user.images = await Promise.all(user.images.map(imageId =>{

            return Image.findById(imageId);
        }))
        
        res.status(200).json({
            user
        });
        
    }catch(err){
        res.status(400).json({
            message : err.message,
            err
        })
    }
}


module.exports.getAllUser = async function(req, res){

    try {
        
        jsonData = req.userData;
        const user = await User.findById(jsonData._id);
        
        if(!user)
            return res.status(404).json({
                message : 'Invalid User!',
                error : {}
            });
        
        if(user.role != 'admin')
            return res.status(400).json({
                message : 'something went worng',
                error : {}
            });

        const users = await User.find({});

        return res.status(200).json({
            message : 'Users List',
            users
        });
        

    } catch (error) {
        
        return res.status(400).json({
            message : 'something went worng',
            error : error
        });

    }
       
};





// User.findById(jsonData._id,(error, user)=>{

//     if(error){
//         return res.status(400).json({
//             message : 'something went worng',
//             error : error
//         });
//     }

//     if(user == null){
//         return res.status(404).json({
//            message : 'Invalid User!',
//            error : {}
//        });
//    };
   
//    var role = user.role;
   
//     if(role != 'admin')
//         return res.status(400).json({
//             message : 'something went worng',
//             error : {}
//         });

//     User.find({}, (error, users) => {

//         if(error){
//             return res.status(400).json({
//                 message : 'something went worng',
//                 error : error
//             });
//         }

//         return res.status(200).json({
//             message : 'Users List',
//             users
//         });

//     });

// });


module.exports.update = async function(req, res){
    // const jsonData = req.userData;
    try{      
        const jsonData = req.userData;
        // var name = jsonData.name;
        const { name} = req.body

        var updated = await User.updateOne({_id : jsonData._id},{name});

        if(!updated.matchedCount){
            return res.status(404).json({
                message : 'user not found'
            });
        } 

        return res. status(200).json({
            updated
        })
        

    }catch(error){
        
        res.status(400).json({
            message : error.message,
            error : error
        });

    }

}
// Event Loop => event loop pickup the callback function from callBACK QUEUE and put in into the call stack.
// completion of one itteration of event loop called one tick  .
// In nodejs architecture there is call stack , web api section ,in web api section there is thread pool file,  
// and in node.js architecture there is call back queue .
// 