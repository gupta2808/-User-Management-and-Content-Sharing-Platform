var express = require('express');

var router = express.Router();

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

const images = require('../controllers/images');

router.post('/', images.uploadImagePromise);

module.exports = router;