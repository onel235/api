import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const dbUser = process.env.MONGO_USER
const dbPass = process.env.MONGO_PASS
const dbName = process.env.MONGO_DB

const url =
  `mongodb+srv://${dbUser}:${dbPass}@cluster0.dni9r.mongodb.net/${dbName}`

mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
);
