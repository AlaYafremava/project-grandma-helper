const mongoose = require('mongoose')

const sonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  grandma: { type: mongoose.Schema.Types.ObjectId, ref: 'grandmas' }
})

module.exports = mongoose.model('son', sonSchema)
