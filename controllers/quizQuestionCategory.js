const CategoryModal = require("../models/quizQuestionCategory")

const handleCreateNewCategory= async (req,res)=>{
    const {category_name} = req.body;

    //400 
    if(!category_name){
        return res.status(400).send({
            status:false,
            message:'All Fields Required'
        })
    }

    //CHECK CATEGORY EXIST OR NOT
    let checkCategory = await CategoryModal.findOne({category_name});
    console.log(checkCategory);
    if(checkCategory){
        return res.status(400).send({
            status:false,
            message:"Email Already Exist"
        })
    }

    //200
    try {
        let result = await CategoryModal.create({
            category_name
        });
        if(result){
            return res.status(200).send({
                status:true,
                message:'Data Added Sucessfully',
                data:result
            })
        }

    } catch (error) {
        console.log(`Something Went Wrong in Adding Question ${error}`);
    }
}
module.exports = {
    handleCreateNewCategory
}