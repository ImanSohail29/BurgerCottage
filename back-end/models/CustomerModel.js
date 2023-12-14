const mongoose=require("mongoose");
const customerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    phoneNumber:{
        type:String,
    }, 
    address:{
        type:String,
    }, 
    joiningdate:{
        type:Date,default:new Date()
    },
    country:{
        type:String,
    }, 
    city:{
        type:String,
    }, 
    state:{
        type:String,
    },
    zipCode:{
        type:String,
    }, 
    password:{
        type:String,
        required:true,
        default:"1111"
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,
    },
    idCardNumber:{
        type:Number
    }
},
{
    timestamps:true,
}
);
const User=mongoose.model("User",customerSchema);
module.exports=User