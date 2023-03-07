const Product = require('../model/product');
const User = require('../model/user')
const Shippinginfo = require('../model/shippinginfo');

exports.shipping = async (req,res,next)=>{
    try {
        const {
            first_name,
            last_name,
            street_address,
            city,
            state,
            zip,
            phone,
            notes,
            email
        } = req.body.userInformation;

       let productDetails = req.body.productInformation;
       let total_price = req.body.totalPrice;
       let productDetailsarr = [];
       let newShipping;
       productDetails.forEach(element => {
               let product = {
                product_id : element._id,
                productname : element.name,
                price : element.splprice,
                quantity : element.quantity,
                attribute : element.attribute ? element.attribute : '',
               }
            productDetailsarr.push(product);
       });
        if(!(first_name || last_name ||street_address || email || city || state || zip || phone ||total_price)){
            res.status(400).json({
                message : "All fields are required !!!"
            })
            return;
        }

        let orderformat = "SDKN000";
        const Shippingdetails = await Shippinginfo.find();
        let orderDetails;

        if(Shippingdetails.length == 0){
            let counter = 1;
            let orderId = orderformat.concat(counter);
            orderDetails = {
                counter : counter,
                orderId : orderId
            }
        }
        else{
            const Shippingdetails = await Shippinginfo.find().sort({_id:-1}).limit(1);
            let counter =  Shippingdetails[0].orderDetails.counter;
            let  newcounter = parseInt(counter);
            newcounter++;
            let orderId = orderformat.concat(newcounter);
            orderDetails = {
                counter : newcounter,
                orderId : orderId
            }
        }

        newShipping = await Shippinginfo.create({
            first_name,
            last_name,
            street_address,
            city,
            state,
            zip,
            phone,
            orderDetails: orderDetails,
            product_details: productDetailsarr,
            total_price,
            email,
            notes
        })

        if(!newShipping){
            res.status(400).json({
                message : "Failed to Shipping Orders !!!"
            })
            return;
        }

        res.status(200).json({
            success :true,
            data : newShipping
        })

    } catch (error) {
        res.status(400).json({
            message : error
        })
    }
}

exports.getAllShipping = async (req,res,next) =>{
    try {
        const ShippingDetails = await Shippinginfo.find();
        if(!ShippingDetails){
            res.status(400).json({
                  message : "Shipping Details Not Found !"
            })
            return;
        }
        res.status(200).json({
            ShippingDetails : ShippingDetails
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

exports.getSingleShippingDetails = async (req,res,next) =>{
    try {
        const id = req.params.id;
        const ShippingDetails = await Shippinginfo.find({_id:id});
        if(!ShippingDetails){
            res.status(400).json({
                  message : "Shipping Details Not Found !"
            })
            return;
        }
        res.status(200).json({
            ShippingDetails : ShippingDetails
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}