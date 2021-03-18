const mongoose = require('mongoose')

const grandmaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  son: { type: mongoose.Schema.Types.ObjectId, ref: 'son' },
  pics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pics' }]
})

module.exports = mongoose.model('grandmas', grandmaSchema)
