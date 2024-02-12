const express = require("express")
const collection = require("./mongo")
const cors = require('cors');



const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get("/", cors(), async (req, res) => {
    try {
      const allUser = await collection.find({}).exec();
      res.send({ status: "ok", data: allUser });
      
    } catch (error) {
      console.log(error);
    }
  });
  
app.post("/",async(req,res)=>{
    const {name} = req.body
    const {email} =req.body
    const {password} =req.body
    const{mobile} = req.body
    const{gender} = req.body
    const{age} = req.body
    const{selectedBrands} = req.body

    const data = {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      gender: gender,
      age:age,
      selectedBrands:selectedBrands,
    }
    

    await collection.insertMany([data])
})

app.put('/bookmarked-titles/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { bookmarks } = req.body;

  
    const user = await collection.findOneAndUpdate(
      { username },
      { bookmarks },
      { new: true },
      {username}
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/bookmarks/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await collection.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.bookmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await collection.findOne({ email, password });
    if (user) {
      await collection.updateOne(
        { email },
        { $inc: { loginCount: 1 } }
      );
      
      res.json({ success: true, user: { email: user.email, name: user.name, mobile:user.mobile, gender:user.gender,age:user.age,password:user.password,title:user.title, selectedBrands : user.selectedBrands
      } });
    
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ success: false });
  }
});


app.post("/bookmarks", async (req, res) => {
  const { name, email, password, mobile, gender, role, age, title } = req.body;

  const data = {
    name,
    email,
    password,
    mobile,
    gender,
    role,
    age
  };

  app.get('/data', async (req, res) => {
    try {
      const data = await collection.find({}).toArray();
  
      
      data.forEach(doc => {
        console.log(doc.title);
      });
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

  const existingUser = await collection.findOne({ email });
  if (existingUser) {
    await collection.updateOne(
      { email },
      { $push: { title: title } }
      );
  } else {
    await collection.insertMany([{ ...data, title: [title] }]);
  }
});


app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await collection.deleteOne({ _id: id });
    res.send({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'error' });
  }
});

app.listen(8000,()=>{
    console.log("port connected")
})


