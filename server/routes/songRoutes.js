const { Router } = require('express');
const songController = require('../controllers/songController');
const multerUpload = require('../multerUpload');

const router = Router();
router.post('/uploadsong', multerUpload, songController.uploadSong);
router.get('/songs', songController.fetchSongs);

router.get('/stream/:songfilename', songController.sendSong);

router.get('/songimage/:artworkfilename', songController.sendArtwork);

router.post('/addfavorite/:id', songController.addToFavorites);

router.get('/getsong/:id', songController.getSong);

router.delete('/deletesong/:id', songController.deleteSong);

router.put('/editsong/:id', songController.editSong);

module.exports = router;
