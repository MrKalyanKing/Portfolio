import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose';
import router from './Routers/router.js';
import { warmCache } from './utils/cache.js';
import { initSocket } from './utils/socket.js';
import describeError from './utils/httpError.js';
import { createServer } from 'http';
import path from 'path'
import nodemailer from 'nodemailer'
import validator from 'validator'
import cors from 'cors'
import dns from 'dns'
import { fileURLToPath } from 'url';
const app = express();

const port = process.env.PORT || 3000;
const URL = process.env.MONGOURL;


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
      to: 'badhavath.kalyan.nayak@gmail.com',
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

// Book-a-call requests from the portfolio's booking modal.
// Delivers a formatted summary of the request to the inbox below.
const BOOK_CALL_INBOX = 'badhavath.kalyan.nayak@gmail.com';

app.post('/api/book-call', async (req, res) => {
  const { name, email, company, projectType, budget, timeline, message } = req.body;

  if (!name || !email || !projectType || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, project type and project details are required.' });
  }
  if (!validator.isEmail(String(email))) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  // Neutralize any HTML in user input before embedding it in the email body
  const esc = (v) => String(v || '—')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const row = (label, value) => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #1c2b25;color:#8ea097;font-size:13px;white-space:nowrap;">${label}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #1c2b25;color:#f4f9f6;font-size:14px;">${esc(value)}</td>
    </tr>`;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: BOOK_CALL_INBOX,
      replyTo: email,
      subject: `📅 New call request — ${name}${company ? ` (${company})` : ''}`,
      html: `
        <div style="background:#060907;padding:28px;font-family:Arial,Helvetica,sans-serif;">
          <div style="max-width:560px;margin:0 auto;background:#0b1512;border:1px solid #1c2b25;border-radius:16px;overflow:hidden;">
            <div style="padding:22px 24px;border-bottom:1px solid #1c2b25;">
              <div style="color:#34d399;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-family:monospace;">// Book a call</div>
              <h2 style="color:#f4f9f6;margin:8px 0 0;font-size:22px;">New call request</h2>
            </div>
            <table style="width:100%;border-collapse:collapse;">
              ${row('Name', name)}
              ${row('Email', email)}
              ${row('Company', company)}
              ${row('Project type', projectType)}
              ${row('Budget', budget)}
              ${row('Timeline', timeline)}
            </table>
            <div style="padding:18px 24px;">
              <div style="color:#8ea097;font-size:13px;margin-bottom:8px;">Project details</div>
              <div style="color:#e7efe9;font-size:14px;line-height:1.7;white-space:pre-wrap;">${esc(message)}</div>
            </div>
            <div style="padding:14px 24px;border-top:1px solid #1c2b25;color:#647069;font-size:12px;">
              Reply to this email to answer ${esc(name)} directly.
            </div>
          </div>
        </div>
      `,
    });

    res.json({ success: true, message: 'Call request sent successfully!' });
  } catch (err) {
    console.error('Error sending book-call email:', err);
    res.status(500).json({ success: false, message: "Couldn't send the request right now — please try again or email me directly." });
  }
});



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

 