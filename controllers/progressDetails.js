const ProgressModal = require("../models/progressDetails");

const handleProgressDetails=(req,res)=>{
   const {user_id,attempted_questions,score_secured,time_spend,status} = req.body;
   const createdAt = new Date();

   console.log(user_id,attempted_questions,score_secured,time_spend,status,createdAt);
}

module.exports = {
    handleProgressDetails
}