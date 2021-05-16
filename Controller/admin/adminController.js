const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId
const AdminModel = require('../../Model/admin/adminModel')
const Crypto = require('crypto-js')
const jwt = require("jsonwebtoken");

//add Admin
exports.SignUp=(req,res)=>{
    //check if admin already created
    AdminModel.find()
    .then((prevAdminData)=>{
        if(prevAdminData && prevAdminData.length>0){
            return res.status(400).json({
                success:true,
                error:'Sorry admin already created!',
            })
          
        }

        //save admin data if admin not created
        let body = req.body   //firstName lastName email password pic
        if(body && body.password){
            body.password = Crypto.AES.encrypt(body.password , process.env.mykey).toString();
        }
        const admin = new AdminModel(body)
        admin.save().then((result)=>{
            return res.status(201).json({
                success:true,
                message:'Admin data saved successfully!',
                result
            })
        }).catch((e)=>{
            console.log('Error in saving admin data',e)
            return res.status(500).json({
                success:false,
                error:'Error in saving admin data'
            })
        })

    }).catch((e)=>{
        console.log('error',e)
        return res.status(500).json({
            success:false,
            error:'error'
        })
    })
    
}

//Update admin by admin id
exports.UpdateAdmin=(req,res)=>{
    const _id = objectId(req.user._id)
    let body = req.body   //firstName lastName email password pic
    if(body && body.password){
        body.password = Crypto.AES.encrypt(body.password , process.env.mykey).toString();
    }
    AdminModel.updateOne({_id},{$set:body}).then(()=>{
        return res.status(201).json({
            success:true,
            message:'Admin data updated successfully!'
        })
    }).catch((e)=>{
        console.log('Error in updating admin data',e)
        return res.status(500).json({
            success:false,
            error:'Error in updating admin data'
        })
    })
}

//Get All admin data
exports.GetAdmin=(req,res)=>{
    AdminModel.findById({_id:objectId(req.user._id)}).then((result)=>{
        return res.status(201).json({
            success:true,
            result
        })
    }).catch((e)=>{
        console.log('Error in getting admin data',e)
        return res.status(500).json({
            success:false,
            error:'Error in getting admin data'
        })
    })
}

//Admin Login
exports.adminLogin = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and Password is not valid"
      });
    }
  
    let tempMail = email.toLowerCase();
    AdminModel.findOne({ email: tempMail })
      .then((savedUser) => {
        if (!savedUser) {
          return res.status(400).json({
            success: false,
            error:"User details is not valid"
          });
        }
        const bytes = Crypto.AES.decrypt(savedUser.password, process.env.mykey)
        var decryptPassword = bytes.toString(Crypto.enc.Utf8);
        if (decryptPassword === password) {
          let token = jwt.sign({ _id: savedUser._id}, process.env.mytokenkey);
          return res.status(200).json({
            success: true,
            message: "User logged-in successfully",
            data: {
              token,
              user: savedUser,
            }
          })
        } else {
          return res.status(400).json({
            success: false,
            error: "Password is not match"
          })
        }
      }).catch((error) => {
        console.log("Error in user find in", error);
        return res.status(500).json({
          success: false,
          error:"Error in user find"
        })
      })
  };
