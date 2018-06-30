let mongoose = require('mongoose');

// Comment Schema
let commentSchema = mongoose.Schema({
  artist:{
    type: String,
    required: true
  },
  link:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: false
  },
  genre:{
    type: String,
    required: false
  },
  commentType:{
    type: String,
    required: true
  },
  parentID:{
    type: String,
    required: true
  }
  
});

let Comment = module.exports = mongoose.model('Comment', commentSchema);