const router = require('express').Router();
const uploadImage = require('../middleware/uploadImage');
const uploadCtr = require('../controller/uploadCtr');
const auth = require('../middleware/auth');

router.post('/upload_avatar', uploadImage, auth, uploadCtr.uploadAvatar);

module.exports = router;