const mongoose = require("mongoose");
const ProgressModal = require("../models/progressDetails");
const AuthModal = require("../models/auth");

const handleProgressDetails = async (req, res) => {
  const { user_id, attempted_questions, score_secured, time_spend, status } =
    req.body;
  const createdAt = new Date();

  //400
  if (
    !user_id ||
    !attempted_questions ||
    !score_secured ||
    !time_spend ||
    !status ||
    !createdAt
  ) {
    return res.status(200).send({
      status: false,
      message: "All Fields Required",
    });
  }

  //404
  //checking the ID is exist in database ***Remember user exist in another table
try {console.log(isValid);
    let isValid = await AuthModal.findOne({_id:user_id});
   
} catch (error) {
        return res.status(400).send({
            status: false,
            message: "ID not valid"
          });
}

  //200
  try {
    let result = await ProgressModal.create({
      user_id,
      attempted_questions,
      score_secured,
      time_spend,
      status,
      createdAt,
    });
    if (result) {
      return res.status(200).send({
        status: true,
        message: "Data Added Successfully",
        data: result,
      });
    }
  } catch (error) {
    console.log(`Something went wrong ERROR ${error}`);
  }
};

module.exports = {
  handleProgressDetails,
};
