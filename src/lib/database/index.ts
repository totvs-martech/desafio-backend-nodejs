import mongoose = require("mongoose");

const connectToDatabase = (uri: string) =>
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

mongoose.set('useCreateIndex', true)


export {connectToDatabase}