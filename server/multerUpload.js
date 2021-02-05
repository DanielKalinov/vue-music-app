const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'songFile') {
      cb(null, './public/song_files');
    } else if (file.fieldname === 'artworkFile') {
      cb(null, './public/artwork_files');
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/ /g, ''));
  }
});

const upload = multer({
  storage: storage
}).fields([
  { name: 'songFile', maxCount: 1 },
  { name: 'artworkFile', maxCount: 1 }
]);

module.exports = upload;
