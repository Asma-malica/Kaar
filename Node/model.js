const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name:{
            //Datatype of name fiels
            type:String,
            //specify whether it is mandatory or not
            required:[true,'Enter the Product name']
        },
        quantity:{
            type:Number,
            requires:true,
            //To ensure the quantity should not hold negative value
            default:0
        },
        price:{
            type: Number,
            required:true,
            default:0
        }

    },
    {
        //To keep track when the details was created 
        timestamp: true
    }
)

const Product = mongoose.model("Products",ProductSchema)
module.exports = Product