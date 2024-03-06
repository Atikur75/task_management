const User = require("../../models/userModel.js");
const bcrypt = require('bcrypt');
const SendMail = require("../../utility/EmailUtility.js");
const { CreateToken } = require("../../utility/JWTToken.js");

// ================================ Registration Controller Start ==============================
async function registrationController(req,res){

    const {firstName,lastName,email,password} = req.body;

    const isExistEmail = await User.find({email});

    if(isExistEmail.length > 0){
       return res.json({status: "error", message: "Email already exist!"});
    }
    
    bcrypt.hash(password, 10, function(err, hash) {

        let user = new User({
            firstName,
            lastName,
            email,
            password:hash,
            otp: "0",
        });
    
        user.save();
    
        return res.json({status: "success", message: "Registration completed successfully!", data: user});
    });
    
}
// ================================ Registration Controller End ==============================

// ================================ Sent OTP Controller Start ==============================
async function sentOTPController(req, res){ 

    const {email, password} = req.body;
    
    const result = await User.find({email});

    if(result.length > 0){

        bcrypt.compare(password, result[0]['password'], async function(err, result) {
            
            if(result){

            // Send OTP Code
            let code = Math.floor(100000 + Math.random() * 900000);
            let EmailText = `Your OTP code is : ${code}`;
            let EmailSubject = "Please Verify Your OTP.";
            await SendMail(email,EmailText,EmailSubject);

            // Update OTP
            await User.findOneAndUpdate({email},{$set:{otp:code}},{new:true});

                return res.json({status: "success", message: "OTP send successfully! Please verify OTP!"});
            }else{
                return res.json({status: "error", message: "Wrong password!"});
            }

        });

    }else{
        return res.json({status: "error", message: "User Unauthorized!"});
    }

}
// ================================ Sent OTP Controller End ==============================

// ================================ Verify OTP Controller Start ==============================
async function verifyOTPController(req,res){

    const {email,otp} = req.body;

    const result = await User.find({email});

    if(result[0]['otp'] === otp){

        // Create Token
        let token =  await CreateToken(result[0]["email"],result[0]["_id"]);
        let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const cookieString = `token=${token};expires=${expireDuration.toUTCString()};path=/`;
        res.cookie(cookieString);

        // Update OTP
        await User.findOneAndUpdate({email},{$set:{otp:"0"}},{new:true});

        return res.json({status: "success", message: "OTP verified successfully!", data:cookieString});
    }else{
        return res.json({status: "error", message: "OTP verified failed!"});
    }

}
// ================================ Verify OTP Controller End ==============================

// ================================ Logout Controller Start ==============================
async function logoutCotroller(req,res){

    res.clearCookie('token');

    return res.json({status: "success", message: "Logout successfully!"});
}
// ================================ Logout Controller End ==============================

module.exports = {registrationController,sentOTPController,verifyOTPController,logoutCotroller};