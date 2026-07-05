import contactModel from "../models/Contact.js";
import validator from 'validator'
import mongoose from "mongoose";
import { getCached, refreshCache } from "../utils/cache.js";
import describeError from "../utils/httpError.js";
const addcontact=async(req,res)=>{
    try {
  const{name,description,email}=req.body;
  // console.log(req.body)
  if(!validator.isEmail(email)){
    return res.json({succes:false,message:"provide an valid email"})
  }
  
  const contact=new contactModel({
    name:name,
    description:description,
    email:email
  })
   
  const savedcon= await contact.save();
  await refreshCache("contact");
  res.status(201).json({succes:true,contact:"Contact is received",savedcon})

}catch(err){
    console.error("addcontact failed:", err);
    const { status, message } = describeError(err, "send the message");
    res.status(status).json({ success: false, message });
}

}
// fetching contacts

const contactfetech = async (req, res) => {
  try {
    // Served from the in-memory cache instead of querying the database
    const contacts = await getCached("contact");

    // Send the fetched contacts in the response
    res.status(200).json({
      success: true,
      message: "Contacts fetched successfully",
      contacts: contacts, // Include the contacts in the response
    });
  } catch (err) {
    console.error("contactfetech failed:", err);
    const { status, message } = describeError(err, "load the contacts");
    res.status(status).json({ success: false, message });
  }
};

// deleting list

 const deletecontact=async(req,res)=>{
  const { id } = req.params;
  //console.log("ID received for deletion:", id);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    const list = await contactModel.findByIdAndDelete(id);
    if (!list) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    await refreshCache("contact");
    return res.json({ success: true, message: 'Contact Removed' });
  } catch (error) {
    console.error(error);
    const { status, message } = describeError(error, "delete the contact");
    return res.status(status).json({ success: false, message });
  }
 }
export  {addcontact,contactfetech,deletecontact}