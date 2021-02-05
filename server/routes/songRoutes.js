const { Router } = require('express');
const songController = require('../controllers/songController');
const multerUpload = require('../multerUpload');

const router = Router();
router.get('/getsong/:id', songController.getSong);
router.get('/songs', songController.fetchSongs);
router.get('/stream/:songfilename', songController.sendSong);
router.get('/songimage/:artworkfilename', songController.sendArtwork);
router.post('/uploadsong', multerUpload, songController.uploadSong);
router.put('/editsong/:id', songController.editSong);
router.post('/addfavorite/:id', songController.addToFavorites);
router.delete('/deletesong/:id', songController.deleteSong);

module.exports = router;
