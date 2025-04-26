const mongoose = require('mongoose');

DATABASE=`mongodb://0.0.0.0:27017/retailstore`
 const connectToDB = async () => {
    try {
        await mongoose.connect(DATABASE)
        console.log("connection established")
    } catch (error) {
        console.log("connection error",error)
    }
}

module.exports = connectToDB