const jwt = require('jsonwebtoken');
const AuthModal = require("../models/auth");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { EMAIL, PASSWORD } = require('../env.js');

//Variable
let OTPCache = {};
//Generate OTP
const generateOTP=()=>{
    return randomstring.generate({
        length: 4,
        charset: 'numeric'
    });
}

//JWT Token
const JWT_SECRET =
    "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

const handleCreateNewUser = async (req, res) => {
    const { name, email, password, gender, role } = req.body;

    const createdAt = new Date();
    const vistedHistory = [];
    console.log(req.body);
    //400
    if (!name || !email || !password || !gender || !role || !createdAt || !vistedHistory) {
        return res.status(400).send({
            status: false,
            message: "All Fields Required"
        })
    }

    //401
    let checkEmail = await AuthModal.findOne({ email });
    if (checkEmail) {
        return res.status(401).send({
            status: false,
            message: "Email Already Exist"
        })
    }

    //200
    try {
        const passwordHash = btoa(password);
        console.log(passwordHash);
        let result = await AuthModal.create({
            name, email, password: passwordHash, gender, role, createdAt, vistedHistory
        });
        if (result) {
            const otp = generateOTP();
            OTPCache = {
                otp:otp,
                useremail : email
            };
            res.cookie("emailToken",OTPCache);
            console.log(OTPCache);
            //Email Sending Code
            //**********************//
            // 1.config
            let config = {
                service: "gmail",
                auth: {
                    user: EMAIL,
                    pass: PASSWORD,
                },
            }
            // 2.transport
            const transporter = nodemailer.createTransport(config);
            // 3.Recevier Details
            const mailOptions = {
                from: EMAIL,
                to: email,
                subject: "Verify Your Email",
                html: `Your OTP Code is <h2>${otp}</h2>`,
            };
            //Now Send Email
            transporter.sendMail(mailOptions)
            .then((actualData)=>{
                
            })
            .catch((err)=>{
                return res.status(500).json({ err });
            })

            //Sucess Status
            return res.status(200).send({
                status: true,
                message: "Please Check Your Email",
                data: result
            })
        }

    } catch (error) {
        console.log(`Something went wrong ERROR ${error}`);
    }
}

const handleVerifyEmail=(req,res)=>{
    const {otpcode} = req.body;
    const {emailToken} = req.cookies;
    // if(emailToken.)
    console.log(otpcode,emailToken);

    if(otpcode == emailToken.otp){
        return res.status(200).send({
            status:true,
            message:"Email Registered Sucessfully"
        })
    }else{
        return res.status(400).send({
            status:false,
            message:"OTP Does not Match"
        })
    }

   // res.cookie('token', '5608');
    // let {token} = req.cookies;
    
    
}


const handleLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //400
        if (!email || !password) {
            return res.status(400).send({
                status: false,
                message: "All Fields Required"
            })
        }
        // Find the user by username
        let result = await AuthModal.findOne({ email });
        if (!result) {
            return res.status(401).send({
                status: false,
                message: "Email Not Exist"
            })
        }
        // Compare the password
        const decodePass = atob(result.password);  // enter database saved password
        console.log(decodePass);
        if (decodePass !== password) {
            return res.status(400).send({
                status: false,
                message: "Password is invalid"
            })
        }

        let currentTime = new Date();

        //visitedHistory updated
        let visited = await AuthModal.findOneAndUpdate(
            { _id: result.id },
            { $push: { vistedHistory: currentTime.toString() } },  //toString()  convert Date into string
            { returnDocument: 'after' }
            //By setting returnDocument to 'after', you're instructing MongoDB to return the updated document
            //(i.e., the document after the $push operation in this case). This ensures that you
            //receive the document with the new changes included.
        )

        //Making JWT
        const token = jwt.sign({ email: result.email }, JWT_SECRET);

        return res.status(200).send({
            status: true,
            message: "Login Sucessfull",
            data: visited,
            usertoken: token
        })

    } catch (error) {
        console.log("Something went wrong during login ")
    }

}

module.exports = {
    handleCreateNewUser,
    handleLoginUser,
    handleVerifyEmail
}