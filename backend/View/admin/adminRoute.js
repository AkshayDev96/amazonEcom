const express = require('express')
const router = express.Router()
const admin = require('../../Controller/admin/adminController')
const adminAuth = require('../../Middleware/admin/admin')

//Admin SignUp
router.post('/admin/signup',admin.SignUp)

//Admin Update
router.put('/admin/update',adminAuth,admin.UpdateAdmin)

//Admin Get
router.get('/admin/get',adminAuth,admin.GetAdmin)

//Admin login
router.post('/admin/login',admin.adminLogin)

module.exports = router