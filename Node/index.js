import mongoose from 'mongoose'
import express from 'express'

const app = express()
const Product = require('./model')
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.post('/api/products',async(req,res)=>{
  try{
    const product = await Product.create(req.body)
    res.status(200).json(product)
  }
  catch(error){
    res.status(500).json({message: error.message})
  }

})




app.listen(3000)
mongoose.connect("mongodb+srv://asmamalica07:NlCWim51BfL0fqIU@cluster0.hyeypys.mongodb.net/").then(()=>console.log("connected"))


