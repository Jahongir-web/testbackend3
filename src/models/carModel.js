const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    title: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Car', carSchema)