const express = require('express');
const morgan = require('morgan');
const authRouter = require('./routes/auth.js');
const questionRouter = require('./routes/quizQuestions.js');
const progressRouter = require('./routes/progressRecords.js');
const quizCategoryRouter = require('./routes/quizQuestionCategory.js')
const { ConnectionDB } = require('./connection.js');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const cloudinary = require('./utils/cloudinary.js');

//JWT Token
const JWT_SECRET =
    "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

//variable
const app = express();
const PORT = 8080;

//connection
const dbUrl = `mongodb+srv://shahasimatiq:mehmoodabad33@quizmasterdb.jvq3hqb.mongodb.net/?retryWrites=true&w=majority&appName=QuizMasterDB`;
ConnectionDB(dbUrl);

//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware express file upload
/////////////////////////////////

// default options
// app.use(fileUpload());
// Use express-fileupload middleware (to access uploaded files easily)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'), // Temp directory for uploaded files
  }));



app.use('/quiz', authRouter);
app.use('/quiz', questionRouter);
app.use('/quiz', progressRouter);
app.use('/quiz', quizCategoryRouter);

app.get('/', (req, res) => {
    return res.json("Hey Hurray!");
})

app.post('/userdata', async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);

        //Next Step
        //Now move find this email (user.email) in database with findOne and return 200 response on success

    } catch (error) {
        console.log("Something Went Wrong", error)
    }
})


//This Multer Code
///////////////////////////

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}-${file.originalname}`)
//     }
// })
// const upload = multer({ storage })
// app.post('/upload', upload.single('file'),async (req, res) => {
//     console.log(req.body);
//     console.log(req.file);
// })

app.post('/upload', async function  (req, res) {
    console.log(req.files);
    const file = req.files.image;  // Access the uploaded file
    try {
       const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
       if(uploadResult){

        // Remove the temporary file after upload
        fs.unlinkSync(file.tempFilePath);
           return res.status(200).send({
               status:true,
               message:'Sucessfully Added In Cloudinary',
               data:uploadResult
           })
       }
       
    } catch (error) {
       return res.status(500).send({
           status:false,
           message:'Error In Uploading',
           error
       })
    }
 });




// listen
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})