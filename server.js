import 'dotenv/config' // Load environment variables
import express from 'express'
import multer from 'multer'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import mongoose from 'mongoose'

const app = express()
app.use(cors())

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI // Use environment variable
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err))

// Define a schema for file metadata
const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  size: Number,
  uploadDate: { type: Date, default: Date.now },
})

// Create a model for the file metadata
const File = mongoose.model('File', fileSchema)

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Save files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Append timestamp to filename
  },
})

const upload = multer({ storage: storage })

// Upload file endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' })
  }

  // Save file metadata to MongoDB
  const newFile = new File({
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
  })

  try {
    await newFile.save()
    res.json({ filePath: `/files/${req.file.filename}` })
  } catch (error) {
    console.error('Error saving file metadata:', error)
    res.status(500).json({ error: 'Failed to save file metadata.' })
  }
})

// Retrieve file endpoint
app.get('/files/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename)
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath)
  } else {
    res.status(404).json({ error: 'File not found.' })
  }
})

// Start the server
const PORT = process.env.PORT || 3000 // Use environment variable or default
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
