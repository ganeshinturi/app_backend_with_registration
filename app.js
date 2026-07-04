const express = require('express');
let connection=require('./config/db')
let products=require('./models/productmodel')
let users=require('./models/usermodel')
let bcrypt=require('bcrypt');
let mail=require('./utils/gmail')
const app = express()
const port = 3000

app.use(express.json());


app.use(express.json());

//api1
app.get('/products', async (req, res) => {
  try {
    let allproducts=await products.find()
    res.status(200).json(allproducts)
  }catch (error) {
    res.json({message:error.message})
  }
})

//api2
app.get('/product/:id', async (req, res) => {
  try {
    let productid=req.params.id
    let singleproduct=await products.findById(productid)
    res.status(200).json(singleproduct)
  }catch (error) {
    res.json({message:error.message})
  }
})

//api3
app.post('/products', async (req, res) => {
  try {
    await products.create(req.body)
    res.status(201).json({message:"Product created successfully"})
  }catch (error) {
    res.json({message:error.message})
  }
})

//api4
app.post('/bulkproducts', async (req, res) => {
  try {
    await products.insertMany(req.body)
    res.status(201).json({message:"Products created successfully"})
  }catch (error) {
    res.json({message:error.message})
  }
})

//api5
app.put('/product/:id', async (req, res) => {
  try {
    let updatedproduct=await products.findByIdAndUpdate(req.params.id, req.body)
    res.status(201).json({message:"Product updated successfully"})
  }catch (error) {
    res.json({message:error.message})
  }
})

//api6
app.delete('/product/:id', async (req, res) => {
  try {
    let deletedproduct=await products.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"Product deleted successfully"})
  }catch (error) {
    res.json({message:error.message})
  }
})


//registration
app.post('/register', async (req, res) => {
  try {
    let {username,password,email} = req.body;
    //1stcheck
    if(!username || !password || !email) return res.json({'msg':'missing fields'})
      //2nd check
    let checkuser=await users.findOne({username})
    if(checkuser)return res.json({'msg':'user already exists'})
      let hashedpassword=await bcrypt.hash(password,10)
    await  users.create({username,password:hashedpassword,email})
    res.json({'msg':'user registered successfully'})
    mail(email,username);
    
  }catch (error) {
    res.json({message:error.message})
  }
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
    connection();
})