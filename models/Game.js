const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  console: {
    type: String,
    required: true,
  },
  note: {
    type: Number,
    default: 5.0
  },
  isOwned: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('game', gameSchema)