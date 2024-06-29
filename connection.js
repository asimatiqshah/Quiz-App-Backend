const mongoose  = require("mongoose");

const ConnectionDB = (url)=>{
mongoose
    .connect(url, { dbName: 'Quiz-App-DB' })
    .then((response) => {
        console.log("MongoDB Connected Successfully")
    })
    .catch((err) => {
        console.log("Database Not Connected",err)
    })
}

module.exports = {
    ConnectionDB
}
