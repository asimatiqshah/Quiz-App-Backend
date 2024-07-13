const QuestionModal = require("../models/quizQuestions");

const handleCreateNewQuestion = async (req, res) => {
  const { quiz_title, question, options, image, question_marks, is_correct,category_id } =
    req.body;
  console.log(quiz_title, question, options, image, question_marks, is_correct,category_id);
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
    !category_id
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
      category_id,
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


const handleCategoryRelatedQuestion = async (req,res)=>{
  try {
    const {category_id} = req.body;

    //400
    if(!category_id){
      return res.status(400).send({
        status:false,
        message:"Category_id is Req"
      })
    }

    //Check category_id is exist in database
    //400
    let checkCategory = await QuestionModal.findOne({category_id});
    if(!checkCategory){
      return res.status(400).send({
        status:false,
        message:"Category is not exist"
      })
    }

    //200
    let result = await QuestionModal.find({category_id});
    if(result){
      return res.status(200).send({
        status:true,
        message:"Category Related Question",
        data:result
      })
    }
  } catch (error) {
    console.log(`Something Went Wrong in Adding Question ${error}`);
  }
}


module.exports = {
  handleCreateNewQuestion,
  handleViewAllQuestion,
  handleCategoryRelatedQuestion
};
