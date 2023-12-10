import multer from 'multer'



const storageVideo = multer.diskStorage({
    // destination: function(req, file, cb){
    //     cb(null, './public')
    // },
    filename:function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
});



const fileFilterVideo = (req, file, cb) => {
    if(file.mimetype === 'video/mp4'){
        cb(null,true);
    }else{
        cb({message: 'Unsupported File Format'}, false)
    }
};

const uploadVideo = multer({
    storage: storageVideo,
    fileFilter: fileFilterVideo
});
export {uploadVideo};