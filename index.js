const express = require('express');
const morgan = require('morgan');
const authRouter = require('./routes/auth.js');
const questionRouter = require('./routes/quizQuestions.js');
const progressRouter = require('./routes/progressDetails.js');
const { ConnectionDB } = require('./connection.js');

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




// listen
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})