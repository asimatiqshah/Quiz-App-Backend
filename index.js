const express = require('express');
const morgan = require('morgan');
const authRouter = require('./routes/auth.js');
const questionRouter = require('./routes/quizQuestions.js');
const progressRouter = require('./routes/progressDetails.js');
const quizCategoryRouter = require('./routes/quizQuestionCategory.js')
const { ConnectionDB } = require('./connection.js');
const jwt = require('jsonwebtoken');

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

app.use('/quiz',authRouter);
app.use('/quiz',questionRouter);
app.use('/quiz',progressRouter);
app.use('/quiz',quizCategoryRouter);

app.get('/',(req,res)=>{
    return res.json("Hey Hurray!");
})

app.post('/userdata',async (req,res)=>{
    const {token} = req.body;
    try {
        const user = jwt.verify(token,JWT_SECRET);
        console.log(user);

        //Next Step
        //Now move find this email (user.email) in database with findOne and return 200 response on success

    } catch (error) {
        console.log("Something Went Wrong",error)
    }
})



// listen
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})