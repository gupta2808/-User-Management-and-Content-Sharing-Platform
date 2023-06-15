var express = require('express');
var router = express.Router();

const users = require('../controllers/users');

function bodyParsrCustomize(req, res, next){
    let buffer = '';
    req.on('data',(chunk)=>{
       buffer = buffer + chunk;
    })
    req.on('end',()=>{

        if(buffer)
            req.body = JSON.parse(buffer);

        next();
    })
}

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

// Protected Routes

router.get('/all', users.getAllUser);

router.get('/', users.getUser);

router.post('/update', users.update);

module.exports = router;