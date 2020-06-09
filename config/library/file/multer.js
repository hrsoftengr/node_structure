const
    multer = require('multer'),
    path = require('path'),
    crypto = require('crypto');

// set storage file
const storage = multer.diskStorage({

    destination: 'public/images/',
    filename: function (req, file, cb) {
        // cb(null, file.fieldname +'-'+ Date.now() + path.extname(file.originalname));
        cb(null, `${Date.now()}${crypto.randomBytes(16).toString('hex')}`);
    }
});


// checkfileType function
function checkFileType(file, cb) {
    let fileTypes = /jpeg|jpg|png|gif|pdf/;
    let extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    // check Image

    let mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Image Only');
    }

}

// upload file
const upload = multer({
    storage: storage,
    limits: {fileSize: 500000},
    fileFilter: ((req, file, cb) => {
        checkFileType(file, cb);
    })
}).single('file');


module.exports = upload;

