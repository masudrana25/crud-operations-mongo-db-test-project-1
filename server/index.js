const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

// mongoose.connect('mongodb://127.0.0.1:27017/crud')
const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/crud');
    console.log('DB is connected');
  } catch (error) {
    console.log('DB is not connected');
    console.log(error);
    process.exit(1);
  }
};

app.get('/', async(req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

app.get('/getUser/:id', async (req, res) => {
  const id = req.params.id;
  const users = await UserModel.find({_id:id});
  res.json(users);
});

app.put('/updateUser/:id', async (req, res) => {
  const id = req.params.id;
  const users = await UserModel.findByIdAndUpdate({_id:id},{name : req.body.name,email: req.body.email, age : req.body.age});
  res.json(users);
});

app.post("/createUser", async (req, res) => {
  try {
     await UserModel.create(req.body)
      .then((user) => res.json(user))
      .catch(err => res.json(err))
  } catch (error) {
    res.send(console.log(error))
  }
});

app.listen(3300,async () => {
  console.log('Server is listening on 3300 port');
  await connectToDB()
})
