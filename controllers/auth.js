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

const handleUserIndvidual = async (req,res)=>{
    const {email} = req.body;
    try {
        if(!email){
            return res.status(400).send({
                status:false,
                message:"Email token required"
            })
        }
        let result = await AuthModal.findOne({email});
        if(!result){
            return res.status(400).send({
                status:false,
                message:"Error In Fetching Individual Detail"
            })
        }

        return res.status(200).send({
            status:true,
            message:"Individual User Detail",
            data:result
        })
    } catch (error) {
        console.log(`Something went in HandleUserIndividual ${error}`);
    }
}

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
            name, email, password: passwordHash, gender, role, userimage:'dummyImage.jpg', createdAt, vistedHistory
        });
        if (result) {

            //clear cookie
            res.clearCookie('emailToken');

            //Do not call otp variable after this because it regenerate otp
            const otp = generateOTP();
            OTPCache = {
                otp:otp,
                useremail : email
            };
            res.cookie("emailToken",OTPCache,{
                httpOnly: true
            });
            console.log(OTPCache);
            //Email Sending Code
            //**********************//
            // 1.config
            let config = {
                service: "gmail",
                port: 465,
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
                html: `Your OTP Code is <h2>${OTPCache.otp}</h2>`,
            };
            //Now Send Email
            try {
                let emailResult = await transporter.sendMail(mailOptions);
                console.log(emailResult);
            } catch (error) {
                console.log(error);
            }

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
    console.log(otpcode,emailToken);
    if(otpcode == emailToken.otp){
        //clear OTP cache
        res.clearCookie('emailToken');
        return res.status(200).send({
            status:true,
             message:"Email Registered Sucessfully",
         })
     }else{
         return res.status(400).send({
             status:false,
             message:"OTP Does not Match"
         })
     }    
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


const handleImageUpload =  async (req,res)=>{
    console.log(req.body);
}

module.exports = {
    handleCreateNewUser,
    handleLoginUser,
    handleVerifyEmail,
    handleUserIndvidual,
    handleImageUpload
}