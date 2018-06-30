let mongoose = require('mongoose');

// Track Schema
let trackSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
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
  trackType:{
    type: String,
    required: true
  },
  trackID:{
    type: String,
    required: false
  },
  // trackHost:{
  //   type: String,
  //   required: false
  // }
  
});

let Track = module.exports = mongoose.model('Track', trackSchema);