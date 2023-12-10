import multer from 'multer'

//specify the storage engine

const storage = multer.memoryStorage({
    // destination: function(req, file, cb){
    //     cb(null, './public')
    // },
    filename:function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const storageVideo = multer.memoryStorage({
   
    filename:function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
});
// file validation

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype ===  'image/png'){
        cb(null,true);
    }else{
        cb({message: 'Unsupported File Format'}, false)
    }
};

const fileFilterVideo = (req, file, cb) => {
    if(file.mimetype === 'video/mp4'){
        cb(null,true);
    }else{
        cb({message: 'Unsupported File Format'}, false)
    }
};


const uploadImage = multer({
    storage: storage,
    limits: {fileSize: 4096 * 4096},
    fileFilter: fileFilter
});

const uploadVideo = multer({
    storage: storageVideo,
    fileFilter: fileFilterVideo
});
export {uploadImage, uploadVideo};
