const mongoose = require('mongoose')

const picSchema = new mongoose.Schema({
  src: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'grandmas' },
  text: String
})

// показывает 5 последних картинок
// picSchema.statics.mostRecent = async function () {
//   return this.find().sort('createdAt').populate('author').limit(5).exec();
// }

module.exports = mongoose.model('pics', picSchema)
