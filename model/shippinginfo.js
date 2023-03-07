const mongoose = require("mongoose");
const shippingScheema = new mongoose.Schema({
    user_id : {
      type : mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    first_name : {
        type : String,
        required: true
    },
    last_name :{
        type : String,
        required: true
    },
    street_address:{
        type:String,
        required: true
    },
    city:{
        type : String,
        required: true
    },
    state : {
        type : String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    phone:{
        type : String,
        required: true
    },
    notes:{
        type : String
    },
    email:{
        type : String
    },
    orderDetails:{
         counter : Number,
         orderId : String  
    },
    product_details :[
            {
                product_id :{
                    type :mongoose.Types.ObjectId,
                    ref:'products',
                },
                productname : {
                    type :String
                },
                priceprice : {
                    type : String
                },
                quantity : {
                    type : String
                }
                
            }
    ],
    total_price:{
        type : String
    }
})

module.exports = mongoose.model('Shippinginfo', shippingScheema)