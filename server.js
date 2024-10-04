const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const collection1 = require('./Userdata')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/issues', require('./routes/issues'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/water-quality', require('./routes/waterQuality'));

app.post('/register',async (req,res) => {
  try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const data = new collection1({
      name:name,email:email,password:password   
      });
      const result = await data.save();
      res.status(200).json(result)
  } catch (error) {
      res.status(401).json({error:error.message})
  }
 });

 app.post('/login',async (req,res) => {
  const email = req.body.email;
  const password = req.body.password
  try {
      const data = await collection1.findOne({email});
      if(data.email==email){
          if(data.password==password){
              res.status(200).json(data)
              console.log('true')
             
          }
      }
  } catch (error) {
      res.status(401).json({error:error.message})
  }
 })
 app.get('/userprofile/:email',async (req,res) => {
  try {
    const email = req.params.email;
    const data = await collection1.findOne({email});
    res.status(201).json(data)
  } catch (error) {
    res.status(401).json(error)
  }
}
)

app.patch('/updateprofile/:email', async (req, res) => {
  try {
      const { email } = req.params;
      const { name, password } = req.body;
      
      // Prepare data to update
      const updateData = { name };
      if (password) {
          updateData.password = password; // Directly assign password
      }

      // Update user profile in the database
      const updatedUser = await collection1.findOneAndUpdate(
          { email: email }, // Find user by email
          { $set: updateData }, // Set the updated name and password (if provided)
          { new: true } // Return the updated document
      );

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Return success response along with the updated user data (if needed)
      res.json({ 
          message: 'Profile updated successfully', 
          user: updatedUser.value // Access the updated user document
      });
  } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Error updating profile' });
  }
});
app.get('/users',async(req,res)=>{
  const data = await collection1.find();
  res.send(data)
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});