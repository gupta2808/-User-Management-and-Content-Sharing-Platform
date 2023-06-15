var express = require('express');
var router = express.Router();

const posts = require('../controllers/posts');
const jwtDecrypt = (req, res, next) => {

    try {
        
        const token = req.headers.authorization;
        const splitToken = token.split('.');
        const payloadToken = splitToken[1];
        const buffer = Buffer.from(payloadToken, 'base64');
        req.userData = JSON.parse(buffer);

        next();
         
    } catch (error) {
        
        res.status(401).json({
            message: 'Unauthorized User',
            error : error
        })

    }

};
router.use(jwtDecrypt);

router.post('/',posts.posts);
router.get('/all',posts.getAllPostsOfUser)


module.exports = router;