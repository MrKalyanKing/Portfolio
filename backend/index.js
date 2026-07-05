import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import router from './Routers/router.js';
import { warmCache } from './utils/cache.js';
import { initSocket } from './utils/socket.js';
import describeError from './utils/httpError.js';
import { createServer } from 'http';
import path from 'path'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dns from 'dns'
import { fileURLToPath } from 'url';
const app = express();

const port = 3000;
const URL = process.env.MONGOURL

//middleware

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//cors

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.options('*', cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Gracefully handle invalid JSON syntax errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, message: 'Invalid JSON payload format. Please check your request body.' });
  }
  next();
});

app.use('/api', router)
app.use('/api/user', router)


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



app.get('/', (req, res) => {
  res.send("Hello")
})

app.use((req, res) => {
  // API clients expect JSON — an HTML 404 shows up in the UI as the cryptic
  // "Unexpected token '<'" parse error, so answer /api requests in JSON.
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      message: `API route not found: ${req.method} ${req.path}. Check the URL the app is calling.`,
    });
  }
  res.status(404).send(`
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
    `);
});

// Last-resort error handler: anything thrown inside middleware (multer upload
// errors, bad payloads, ...) becomes a descriptive JSON message, never a
// generic HTML "server error" page.
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  console.error('Unhandled error:', err);
  const { status, message } = describeError(err, 'process the request');
  res.status(status).json({ success: false, message });
});


// Socket.IO shares the HTTP server so websockets ride the same port
const server = createServer(app);
initSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
dns.setServers(['8.8.8.8', '1.1.1.1']);
mongoose.connect(URL)
  .then(() => {
    console.log('Connected to MongoDB');
    // Load all collections into RAM so requests never wait on MongoDB
    return warmCache();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  })

 