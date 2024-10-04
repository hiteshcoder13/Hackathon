const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  status:{
    type:String,
    default:"pending"
  },
  email:String,
  location: String,
  issueType: String,
  description: String,
  photoUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Issue', IssueSchema);