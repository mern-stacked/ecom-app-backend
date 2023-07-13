const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg',
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Accepted Image Format (jpeg, jpg, png)');

        if(isValid){ uploadError = null }

        cb(uploadError, 'public/uploads');

    },  

    filename: function (req, file, cb) {
      const fileName = file.originalname.split(' ').join('-'); 
      const extension = MIME_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
  })

 const uploadOptions = multer({
    limits: 500000,
    storage: storage
 })

module.exports = uploadOptions;