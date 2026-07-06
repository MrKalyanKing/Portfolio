import express from "express";
import multer from "multer";
import  { projectfetch, addproject, deleteproject, updateproject} from "../Controllers/projectadd.js";
import { login, register } from "../Controllers/UserAuth.js";
import {addexpereince, deletework, workfetch, updateexperience } from "../Controllers/Expererince.js";
import {techstack,  techfetch } from "../Controllers/techstack.js";
import  { addcontact,contactfetech, deletecontact } from "../Controllers/Contact.js";
import { fetchskill, skilladd } from "../Controllers/skill.js";

const router=express.Router();

//multerte

const storage=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

 const upload =multer({storage:storage})

//adding project

router.post('/project',upload.single('image'),addproject)
router.post('/register',register)
router.post('/login',login)
router.post('/work',upload.single('image'),addexpereince)
router.post('/techstack',upload.single('image'),techstack)
router.post('/contact',addcontact)
router.post('/skill',upload.single('image'),skilladd)

// update endpoints
router.put('/project/:id', upload.single('image'), updateproject);
router.post('/project/update/:id', upload.single('image'), updateproject);
router.put('/work/:id', upload.single('image'), updateexperience);
router.post('/work/update/:id', upload.single('image'), updateexperience);

//fetching the database item
router.get('/show/contact',contactfetech)
router.get('/show/project',projectfetch)
router.get('/show/work',workfetch)
router.get('/show/tech',techfetch)
router.get('/show/skill',fetchskill)
//delete
router.delete('/delete/:id',deletecontact)
router.delete('/delete/work/:id',deletework)
router.delete('/delete/project/:id',deleteproject)
export default router