const express = require('express')
const router = express.Router()
const imageKit = require('../../Controller/ImageKit/fileKit')

//Image Auth routes
router.get('/imagekit/auth',imageKit.authImage)

module.exports = router