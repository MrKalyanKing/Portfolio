import mongoose, { Schema } from "mongoose";


const expereinceSchema =new Schema({
    role:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    location:{
        type:String,
    },
    description:{
        type:[String],
        required:true,
    },
    duration:{
        type:String,
        required:true
    },
    techStack:{
        type:[String],
    }

})

const ExpereinceModel =new mongoose.model('Expereince',expereinceSchema)

export default ExpereinceModel