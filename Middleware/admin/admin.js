const jwt = require("jsonwebtoken");
const AdminModel = require("../../Model/admin/adminModel");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized 1",
      data: {},
    });
  }

  let token = authorization.replace("Bearer ", "");

  jwt.verify(token,process.env.mytokenkey, (err, decoded) => {
    if (!decoded || err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized 2",
        data: {},
      });
    }

    let _id = decoded._id;
    
    AdminModel.findById({ _id })
      .then((result) => {
        if (result == undefined || result == null) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized 3",
            data: {},
          });
        }
        req.user = result;
        next();
      }).catch((err) => {
        console.log("problem with user fetching in", err);
        return res.status(500).json({
          success: false,
          message: "problem with user fetching",
          data: {},
        });
      });
  });
};
