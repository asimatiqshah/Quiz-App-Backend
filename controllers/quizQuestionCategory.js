const CategoryModal = require("../models/quizQuestionCategory")

const handleCreateNewCategory= async (req,res)=>{
    const {category_name,category_image,category_color} = req.body;
    //400 
    if(!category_name || !category_image || !category_color ){
        return res.status(400).send({
            status:false,
            message:'All Fields Required'
        })
    }

    //CHECK CATEGORY EXIST OR NOT
    let checkCategory = await CategoryModal.findOne({category_name});
    if(checkCategory){
        return res.status(400).send({
            status:false,
            message:"Category Already Exist"
        })
    }

    //200
    try {
        let result = await CategoryModal.create({
            category_name,
            category_image,
            category_color
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

const handleShowCategories = async (req,res)=>{
    try {
        let result = await CategoryModal.find();
        if(result){
            return res.status(200).send({
                status:true,
                message:"Data Show Sucessfully",
                data:result
            })
        }
    } catch (error) {
        console.log(`Something Went Wrong in Adding Question ${error}`);
    }
}

module.exports = {
    handleCreateNewCategory,
    handleShowCategories
}