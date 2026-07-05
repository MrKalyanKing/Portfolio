import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import router from './Routers/router.js';
import path from 'path'
import nodemailer from 'nodemailer'
import cors from 'cors'
import { fileURLToPath } from 'url';
const app=express();

const port=3000;
const URL=process.env.MONGOURL

//middleware

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
//cors

app.use(cors({
    origin:'*',
    methods: ['GET', 'POST','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization']
  }))
  
app.options('*',cors())

app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/api',router)
app.use('/api/user',router)


// sending email

app.post('/api/sendemail', async (req, res) => {
    const { email, name, description } = req.body;
    
  
    if (!email || !name || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
  
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASS,
        },
      });
  
      const sendEmail = {
        from: email,
        to: process.env.USER_EMAIL,
        subject: 'You have a new Portfolio query',
        html: `
          <h2>New Feedback Report</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Description:</strong> ${description}</p>
        `,
      };
  
      const info = await transporter.sendMail(sendEmail);
     
      res.json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
      console.error('Error sending email:', err);
      res.status(500).json({ success: false, message: 'Error sending email.' });
    }
  });
  

//closing of an email



app.get('/',(req,res)=>{
    res.send("Hello")
})

app.use((req, res) => {
    res.status(404).send(`
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
    `);
});


app.listen(port,()=>{
    console.log(`App is Running on port ${port}`)
})

mongoose.connect(URL)
.then(()=>{
    console.log("DB Connected")
})
.catch((err)=>{
    console.log(err)
})
