const QuestionModal = require("../models/quizQuestions");

const handleCreateNewQuestion = async (req, res) => {
  const { quiz_title, question, options, image, question_marks, is_correct,category } =
    req.body;
  console.log(quiz_title, question, options, image, question_marks, is_correct,category);
  const createdAt = new Date();
  //400
  if (
    !quiz_title ||
    !question ||
    !options ||
    !image ||
    !question_marks ||
    !is_correct ||
    !createdAt ||
    !category
  ) {
    return res.status(400).send({
      status: false,
      messsage: "All Fields Required",
    });
  }

  //200
  try {
    let result = await QuestionModal.create({
      quiz_title,
      question,
      options,
      image,
      category,
      question_marks,
      is_correct,
      createdAt
    });
    if(result){
        return res.status(200).send({
            status:true,
            message:"Question Added Successfully",
            data:result
        })
    }
  } catch (error) {
    console.log(`Something Went Wrong in Adding Question ${error}`);
  }
};

const handleViewAllQuestion = async (req,res)=>{
  try {
    let result = await QuestionModal.find();
   if(result){
    return res.status(200).send({
        status:true,
        message:"All Questions",
        data:result
    })
   }
  } catch (error) {
    console.log(`Something Went Wrong in Adding Question ${error}`);
  }
}

module.exports = {
  handleCreateNewQuestion,
  handleViewAllQuestion
};
