import multer from 'multer';
import fs from 'fs';


const uploadDir = 'tmp';

const storage = multer.diskStorage({
destination: (req, file, cb) => {

    if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
},
filename: (req, file, cb) => {

    cb(null, `${Date.now()}-${file.originalname}`);
},
});

const upload = multer({ storage });

export default upload;
