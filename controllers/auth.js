const AuthModal = require("../models/auth");

const handleCreateNewUser = async (req, res) => {
    const { name, email, password, gender, role } = req.body;

    const createdAt = new Date();
    const vistedHistory = [];

    //400
    if (!name || !email || !password || !gender || !role || !createdAt || !vistedHistory) {
        return res.status(400).send({
            status: false,
            message: "All Fields Required"
        })
    }

    //401
    let checkEmail = await AuthModal.findOne({email});
    if(checkEmail){
        return res.status(401).send({
            status: false,
            message: "Email Already Exist"
        })
    }

    //200
    try {
        let result = await AuthModal.create({
            name, email, password, gender, role, createdAt,vistedHistory
        });
        if(result){
            return res.status(200).send({
                status:true,
                message:"Data Added Sucessfully",
                data:result
            })
        }
    } catch (error) {
        console.log(`Something went wrong ERROR ${error}`);
    }
}

module.exports = {
    handleCreateNewUser
}