const mongoose = require("mongoose");

const data = new mongoose.Schema({
    
  train: {
    type: Object,
    required: true,
    unique:true
  },
  
});


module.exports = mongoose.model("trainData", data);
