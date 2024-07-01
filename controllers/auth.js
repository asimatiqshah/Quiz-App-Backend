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
    let checkEmail = await AuthModal.findOne({ email });
    if (checkEmail) {
        return res.status(401).send({
            status: false,
            message: "Email Already Exist"
        })
    }

    //200
    try {
        let result = await AuthModal.create({
            name, email, password, gender, role, createdAt, vistedHistory
        });
        if (result) {
            return res.status(200).send({
                status: true,
                message: "Data Added Sucessfully",
                data: result
            })
        }
    } catch (error) {
        console.log(`Something went wrong ERROR ${error}`);
    }
}

const handleLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let result = await AuthModal.findOne({ email });
        let currentTime = new Date();

        //visitedHistory updated
        let visited = await AuthModal.findOneAndUpdate(
            { _id: result.id },
            { $push: { vistedHistory: currentTime.toString() } },  //toString()  convert Date into string
            { returnDocument: 'after' }
            //By setting returnDocument to 'after', you're instructing MongoDB to return the updated document
            //(i.e., the document after the $push operation in this case). This ensures that you
            //receive the document with the new changes included.
        )
        return res.status(200).send({
            status:true,
            message:"Login Sucessfull",
            data:visited
        })

    } catch (error) {
        console.log("Something went wrong during login ")
    }

}

module.exports = {
    handleCreateNewUser,
    handleLoginUser
}