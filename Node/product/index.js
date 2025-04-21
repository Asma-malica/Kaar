import express from 'express'
import mongoose from 'mongoose'
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('Server running');
});

mongoose.connect("mongodb+srv://asmamalica07:Asma2004@cluster0.2yo5ign.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
