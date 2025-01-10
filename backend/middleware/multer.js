import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads/'); // Specify the directory to save the files
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname); // Keep the original file name
    }
});

const upload = multer({ storage });

export default upload; 
