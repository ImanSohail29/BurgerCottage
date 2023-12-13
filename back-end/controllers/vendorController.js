const Vendor=require("../models/VendorModel")
const getVendors=async(req,res,next)=>{
    try{
        const vendors=await Vendor.find({}).orFail()
        return res.json(vendors)
    }catch(error){
        next(error)
    }
}
const getVendor=async(req,res,next)=>{
    try{
        const vendor=await Vendor.findById(req.params.id).orFail()
        return res.send(vendor);
    }catch(error){
        next(error)
    }
}
const createNewVendor=async(req,res,next)=>{
    try{
        const {name,email,phoneNumber,idCardNumber}=req.body
        if(!(name&&phoneNumber)){
            return res.status(400).send("Enter all required Inputs!")
        }
        const vendorExists=await Vendor.findOne({phoneNumber})
        if(vendorExists){
            return res.status(400).json({error:"vendor exists"})
        }
        else{
            const vendor=await Vendor.create({
                name,email:email.toLowerCase(),phoneNumber,idCardNumber
            })
            return res.status(201).json(
                {
                    success:"vendor created!",
                    vendorCreated:{
                        id:vendor._id,
                        name:vendor.name,
                        email:vendor.email,
                        phoneNumber:vendor.phoneNumber,
                        idCardNumber:vendor.idCardNumber
                    }
                }
            )
        }
    }
    catch(error){
        next(error)
    }
}
const updateVendor=async(req,res,next)=>{
    try{
        const vendor=await Vendor.findById(req.params.id).orFail()
        vendor.name=req.body.name||vendor.name
        vendor.phoneNumber=req.body.phoneNumber||vendor.phoneNumber
        vendor.email=req.body.email||vendor.email
        vendor.idCardNumber=req.body.idCardNumber||vendor.idCardNumber
        await vendor.save()
        return res.send("vendor updated")
    }catch(error){
        next(error)
    }
}
const updateVendorTransactions=async(req,res,next)=>{
    try{
        const vendor=await Vendor.findById(req.params.id).orFail()
        vendor.name=req.body.name||vendor.name
        vendor.phoneNumber=req.body.phoneNumber||vendor.phoneNumber
        vendor.email=req.body.email||vendor.email
        vendor.idCardNumber=req.body.idCardNumber||vendor.idCardNumber
        await vendor.save()
        return res.send("vendor updated")
    }catch(error){
        next(error)
    }
}
const deleteVendor=async(req,res,next)=>{
    try{
        console.log("hello")
        const vendor=await Vendor.findById(req.params.id).orFail()
        await vendor.deleteOne()
        return res.send("vendor removed")
    }
    catch(error){
        next(error)
    }
}
module.exports={getVendors,getVendor,createNewVendor,updateVendor,deleteVendor}