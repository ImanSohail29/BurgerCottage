require("dotenv").config()
const client = require('twilio')(process.env.REACT_APP_TWILIO_ACCOUNT_SID, process.env.REACT_APP_TWILIO_AUTH_TOKEN)
const sendSMS = async (body) => {
    let msgOptions = {
        from: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
        to: process.env.REACT_APP_TWILIO_TO_PHONE_NUMBER,
        body
    }
    try {
        const message=await client.messages.create(msgOptions)
        console.log("message: "+message)
    }
    catch (err) {
        console.log(err)
    }
}
function replaceCharacter(str, index, replacement) {
    let strLength=str.length
    str=str.slice(1, strLength)
    return (
      replacement+str
    );
  }
  
const sendSMSToCustomer = async (phoneNumber,body) => {
    if(phoneNumber[0]!="+")
    {
        console.log(phoneNumber[0])
        phoneNumber=replaceCharacter(phoneNumber, 0, '+92');
    }
    console.log('whatsapp:'+phoneNumber)
    console.log(process.env.REACT_APP_TWILIO_USER_PHONE_NUMBER)
    let msgOptions = {
        from: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
        to: 'whatsapp:'+phoneNumber,
        body
    }
    try {
        const message=await client.messages.create(msgOptions)
        console.log("message: "+JSON.stringify(message))
    }
    catch (err) {
        console.log(err)
    }
}
module.exports={sendSMS,sendSMSToCustomer};