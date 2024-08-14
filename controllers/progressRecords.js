const mongoose = require("mongoose");
const ProgressModal = require("../models/progressRecords");
const AuthModal = require("../models/auth");
const CategoryModal = require("../models/quizQuestionCategory");

//This Method Is For Create New Records
const handleProgressRecords = async (req, res) => {
  const { user_id,category_id, attempted_questions, score_secured, time_spend, status } =
    req.body;
  const createdAt = new Date();

  //400
  if (
    !user_id ||
    !attempted_questions ||
    !score_secured ||
    !time_spend ||
    !status ||
    !createdAt ||
    !category_id
  ) {
    return res.status(200).send({
      status: false,
      message: "All Fields Required",
    });
  }

  //404
  //checking the ID is exist in database ***Remember user exist in another table
  try {
    let isValid = await AuthModal.findOne({ _id: user_id });
    if(!isValid){
      return res.status(400).send({
        status:false,
        message:'User ID is not Valid'
      })
    }

    let categoryValid = await CategoryModal.findOne({_id:category_id});
    if(!categoryValid){
      return res.status(400).send({
        status:false,
        message:"Category ID is not Valid"
      })
    }

    //200
    try {
      let result = await ProgressModal.create({
        user_id,
        category_id,
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

  } catch (error) {
    return res.status(400).send({
      status: false,
      message: "ID not valid"
    });
  }
};

const handleIndvidualProgressRecord = async (req, res) => {
  const { user_id } = req.body;
  try {
    if (!user_id) {
      return res.status(400).send({
        status: false,
        message: "User ID Field Required"
      })
    }
    let result = await ProgressModal.findOne({ user_id });
    if (!result) {
      return res.status(400).send({
        status: false,
        message: "Error In Fetching Individual Progress Detail"
      })
    }

    return res.status(200).send({
      status: true,
      message: "Individual User Progress Detail",
      data: result
    })
  } catch (error) {
    console.log(`Something went in HandleUserIndividual ${error}`);
  }
}
module.exports = {
  handleProgressRecords,
  handleIndvidualProgressRecord
};
