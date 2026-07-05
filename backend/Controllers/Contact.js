import contactModel from "../models/Contact.js";
import validator from 'validator'
import mongoose from "mongoose";
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
  res.status(201).json({succes:true,contact:"Contact is received",savedcon})

}catch(err){
    res.status(500).json({succes:false,message:"Contact is not created",err})
}

}
// fetching contacts

const contactfetech = async (req, res) => {
  try {
    // Fetching contacts from the database
    const contacts = await contactModel.find({});

    // Send the fetched contacts in the response
    res.status(200).json({
      success: true,
      message: "Contacts fetched successfully",
      contacts: contacts, // Include the contacts in the response
    });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to fetch contacts" });
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

    //console.log('Contact deleted', id);
    return res.json({ success: true, message: 'Contact Removed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error removing the Contact' });
  }
 }
export  {addcontact,contactfetech,deletecontact}