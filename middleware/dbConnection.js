module.exports = () => {
  const mongoose = require('mongoose')

  // mongoose.connect('mongodb://localhost/Helper', {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // });

  mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

}


