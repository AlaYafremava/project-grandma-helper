module.exports = () => {
  const mongoose = require('mongoose')

  mongoose.connect('mongodb://localhost/Helper', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
