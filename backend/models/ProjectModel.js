import mongoose, { Schema } from "mongoose";

const projectSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tags: [
        {
            name: { type: String},
            color: { type: String }
        }
    ],
    kind: {
        type: String,
        default: "Project"
    },
    image:{
        type:String,
        required:true,
    },
    githublink:{
        type:String,
        required:true,
    },
    previewlink:{
        type:String,
        required:true,
    }
})

const projectmodel = mongoose.model('project',projectSchema);

export default projectmodel