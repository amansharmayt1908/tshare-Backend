// mongoConnect.js
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());


const uri = 'mongodb+srv://amansharmayt19:nvrQpvCAPAWSEh9C@scripterx.7nhap.mongodb.net/Tshare?retryWrites=true&w=majority&appName=ScripterX';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

const textSchema = new mongoose.Schema({
    text: String ,
    id : Number
});

const generate4DigitId = () => {
  return Math.floor(1000 + Math.random() * 9000); 
};


const TextModel = mongoose.model('Text', textSchema);

app.post('/save', async (req, res) => {
  try {
    const { text } = req.body;
    const id = generate4DigitId();
    const newText = new TextModel({ text, id });
    await newText.save();
    res.json({ success: true, id, message: 'Text saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



app.get('/get/:id', async (req, res) => {
  try {
    const text = await TextModel.findOne({ id: req.params.id });
    if (!text) {
      return res.status(404).json({ success: false, message: 'Text not found' });
    }
    res.json({ success: true, text: text.text });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(5000, () => console.log('Server is running on port 5000'));