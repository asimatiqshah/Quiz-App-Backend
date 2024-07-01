const QuestionModal = require("../models/quizQuestions");

const handleCreateNewQuestion = async (req, res) => {
  const { quiz_title, question, options, image, question_marks, is_correct } =
    req.body;
  console.log(quiz_title, question, options, image, question_marks, is_correct);
  const createdAt = new Date();
  //400
  if (
    !quiz_title ||
    !question ||
    !options ||
    !image ||
    !question_marks ||
    !is_correct ||
    !createdAt
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

module.exports = {
  handleCreateNewQuestion,
};
