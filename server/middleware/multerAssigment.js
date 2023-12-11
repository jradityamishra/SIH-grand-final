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


// file validation

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'application/pdf'){
        cb(null,true);
    }else{
        cb({message: 'Unsupported File Format'}, false)
    }
};




const uploadAssignment = multer({
    storage: storage,
    fileFilter: fileFilter
});


export {uploadAssignment};
