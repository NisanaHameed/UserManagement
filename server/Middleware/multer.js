const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../uploads'));
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
})

const uploadImage = multer({storage:storage}).single('image');

module.exports = uploadImage;