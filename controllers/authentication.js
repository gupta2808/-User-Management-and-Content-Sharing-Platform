var passport = require('passport');
const path = require("path");
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
    var user = new User();
  
    user.name = req.body.name;
    user.email = req.body.email;
    user.role = 'student';
    user.setPassword(req.body.password);
  
    user.save(function(err) {
        
      if(err) return res.status(400).json({
        message: "something went wrong!",
        error: err
      });
      
      var token;
      token = user.generateJwt();
    
      res.json({
        message : "Registered Succesfully!"
      });
      
    });  res.status(200);
};

module.exports.login = function(req, res) {

    User.findOne({ email: req.body.email }, (error, user)=>{

        if(error){
            // return res with this error
            return res.status(400).json({
                message: "something went wrong!",
                error: error
              });
        }
        
        if(!user){
            return res.status(400).json({
                message: "user not found",
                error: {}
            });
        }

        const isValidUser = user.validPassword(req.body.password);

        if(isValidUser == true){
            // jwt gen return 
            const jwtToken = user.generateJwt();
            return res.status(200).json({
                token : jwtToken
            });
        }

        // return res "email/password" is wrong
        return res.status(400).json({
           message : error.message
        });
        
    }); 
    
    // ()=>{} or function(){}
};

// module.exports.loginPromise = async function(req, res) {

//     try {
        
//         const user = await User.findOne({ email: req.body.email });
        
//         if(user == null){
//             return res.status(401).json({
//                 message: "user not found",
//                 error: {}
//             });
//         }  
            
//         const isValidUser = user.validPassword(req.body.password);  
//         if(isValidUser == true){
//             // jwt gen return 
//             const jwtToken = user.generateJwt();

//             return res.status(200).json({
//                 jwtToken
//             });
//         }
        
//         return res.status(400).json({
//             message: "email/password is wrong!",
//             error: {}
//         });

//     } catch (error) {
        
//         return res.status(400).json({
//             message: "Something went wrong!",
//             error: error
//         });
//     }

// };

// module.exports.userData = async function(req, res){
//     var token = req.headers.authorization;
    // console.log(token);
//     var splitToken = token.split('.');
//     var payloadToken = splitToken[1];
//     var buffer = Buffer.from(payloadToken, "base64");
//     // console.log(buffer);
//     var jsonData = JSON.parse(buffer);
//     module.exports.userDataPromise = async function(req, res) {
//     try{
//         var user = await User.findOne({email:jsonData.email});
//         if(user == null){
//                     res.status(404).json({
//                 message : 'user not found',
//                 error: {}
//             });          
//         }
//         user.salt = undefined;
//         user.hash = undefined;
//         user.__v = undefined;

//         res.status(200);
//         res.json({
//             user: user
//         });

//     // console.log(user);
        
//     }catch(error){

//         return res.status(400).json({
//             message: "Something went wrong!",
//             error: error
//         });

//     }
// };

    
    // User.findOne({ email:jsonData.email }, (error,user) =>{
    //     if(error){
    //         res.status(400);
    //         res.json({
    //             message: "Something went worng",
    //             error: error
    //         });
    //     }
    //     if(user == null){
    //         res.status(404);
    //         res.json({
    //             message: "user not found",
    //             error:{}
    //         });
    //     }
    //     console.log(user);
    //     res.status(200);
    //     res.json({
    //         user: user
    //     });
    // })   
// };
