const mongoose = require("mongoose");

const orderScheema = new mongoose.Schema({
    userinfomation : {
        type : Object,
        required : [true, "User Information is required..."],
    },
    productinformation : {
        type : Object,
        required : [true, "Product Information is required..."],
    },
    totalprice : {
        type: Number,
        required : [true, "Total Price field is required..."],
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model('Order', orderScheema)
