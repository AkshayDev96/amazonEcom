const uuid = require("uuid");
const crypto = require("crypto");

exports.authImage = (req,res)=>{
    var token = req.query.token || uuid.v4();
    var expire = req.query.expire || parseInt(Date.now() / 1000) + 2400;
    var signature = crypto
    .createHmac("sha1", process.env.privateKeyImageKit)
    .update(token + expire)
    .digest("hex");

     return res.status(200).json({
          token: token,
          expire: expire,
          signature: signature
        });
}