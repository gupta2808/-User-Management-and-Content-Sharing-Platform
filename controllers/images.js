const path = require("path");
const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const User = mongoose.model('User');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
})
const maxSize = 2 * 1000 * 1000;
var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){

        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
            
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
    } 
}).single("file");

const uploadPromise = (req, res) =>{
    return new Promise((resolve, reject) => {
        upload(req, res,async function(error){
            if(error)
                reject(error);
            else
                resolve();
        });
    });
}

module.exports.uploadImagePromise = async function(req, res){

    try {
        var image = new Image();

        var user = await User.findById(req.userData._id);
    
        user.images.push(image._id);

        

        await uploadPromise(req, res);

        jsonData = req.userData;
        image.name = req.file.filename;
        image.user = jsonData._id;
        image.is_profile = req.body.is_profile;
        // image.__v = undefined;

        // await image.save();

        // await user.save();

        await Promise.all([
            
            image.save(),
            user.save()

        ]);
        res.status(200).send({
            image
        });

    } catch (error) {
        
        res.status(400).json({
            message: error.message,
            error 
        })
    }
}



// module.exports.imageCallBackFunction = async function(req, res){
    
//     try{

//         const image = new Image();
        
//         const jsonData = req.userData;

//         image.user_id = jsonData._id ;
//         image.is_profile = req.body.is_profile;
//         image.file = req.body.file;


//         image.save(function(err) {

//             if(err) 
//             return res.status(400).json({
//             message: err.message,
//             error: err
//             });

//             res.json({
//             message : "image uploaded successfully"
//             });
            
//         });

//     }
//     catch(error){
//         return res.status(400).json({
//             message : 'something went worng',
//             error
//         });

//     }
// }

// module.exports.userDataPromise = async function(req, res){
//     try{
//         var token = req.headers.authorization;
//         var splitToken = token.split('.');
//         var payloadToken = splitToken[1];
//         var buffer = Buffer.from(payloadToken,'base64');
//         var jsonData = JSON.parse(buffer);
//         var user = await User.findOne({_id : jsonData._id })
//         if(user == null){
//             res.status(404).json({
//                 message : 'user not found',
//                 error : {}
//             });
//         }
//         user.salt = undefined;
//         user.hash = undefined;
//         user.__v = undefined;
//         res.status(200);
//         res.json({
//             user : user,
//         });
//     }catch(error){
//         res.status(404).json({
//             message : 'somthing went worng',
//             error : error
//         });
//     } 
// };

// module.exports.userDataCallback = function(req, res){
//     var token = req.headers.authorization;
//     var splitToken = token.split('.');
//     var payloadToken = splitToken[1];
//     var buffer = Buffer.from(payloadToken,'base64');
//     var jsonData = JSON.parse(buffer);
//     User.findOne({_id : jsonData._id},(error,user)=>{
//         if(error){
//             return res.status(400).json({
//                 message : 'Somthing went worng',
//                 error : error
//             });
//         };
//         if(user == null){
//             return res.status(400).json({
//                 message : 'user not found',
//                 error : error
//             }); 
//         }
//         user.salt = undefined;
//         user.hash = undefined;
//         user.__v = undefined;
//         res.status(200).json({
//             user : user
//         });
//     });
// }

// module.exports.userDataPromise1 = function(req, res){
//     try{
//         var token = req.headers.authorization;
//         var splitToken = token.split('.');
//         var payloadToken = splitToken[1];
//         var buffer = Buffer.from(payloadToken,'base64')
//         var jsonData = JSON.parse(buffer);
//         User.findById(jsonData._id, function (error,user){
//             if(error){
//                 return res.status(404).json({
//                     message : 'somthing went worng',
//                     error : error
//                 });
//             }
//             if(user == null){
//                 return res.status(404).json({
//                     message : 'user not found',
//                     error : error
//                 });
//             }
//             user.salt = undefined
//             res.status(200);
//             res.json({
//                 user : user
//             })
//         }) 
//     }catch(error){
//         return res.status(404).json({
//             message : 'user not found',
//             error : error
//         });
//     }
// }
// module.exports.getUser =async function(res, req){
//     try{
//         var token = req.headers.authorization;
//         var splitToken = token.split('.');
//         var payloadToken = splitToken[1];
//         var buffer = Buffer.from(payloadToken, 'base64');
//         var jsonData = JSON.parse(buffer);
        
//         if(image == null){

//         }
//         if(is_profile == true){

//         }
        
//     }
//     catch(error){

//     }
// }
// module.exports.userDataCallBackFunction = function(req, res){
//     var token = req.headers.authorization;
//     var splitToken = token.split('.');
//     var payloadToken = splitToken[1];
//     var buffer = Buffer.from(payloadToken, 'base64');
//     var jsonData = JSON.parse(buffer);
//     User.findById(jsonData._id,function (error, user){
//         if(error){
//             res.status(400).json({
//                 message : 'something went worng',
//                 error : error
//             });
//         };
//         if(user == null){
//              res.status(404).json({
//                 message : 'user not  found',
//                 error : error
//             }) ;
//         };
        
//         user.salt = undefined;
//         user.hash = undefined;
//         user.__v = undefined;

//         Image.find({user_id : jsonData._id},(error, images)=>{
//             if(error){
//                 res.status(400).json({
//                     message : 'something went worng',
//                     error : error
//                 })
//             }
//             if(images == null){
//                 res.status(404).json({
//                     message : 'image not found',
//                     error : {}
//                 })
//             }

//             user = JSON.parse(JSON.stringify(user));

//             user.images = images;

//             res.status(200).json({
//                 user
//             })

//         })
//     });
// };
