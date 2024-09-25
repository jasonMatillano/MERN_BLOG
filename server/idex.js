const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const UserModel = require('./models/UserModel')


const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(cookieParser())

mongoose.connect('mongodb://127.0.0.1:27017/blog')
.then(() => {console.log('Connected to MongoDB')})
.catch(err => { console.log(err)})

app.post('/register', async (req, res) => {
    try {
        // Check if user already exists
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            return res.send({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        // Create a new user
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        // Save the new user
        await newUser.save();
        return res.send({ message: 'User created successfully' });

    } catch (err) {
        // Handle errors
        return res.status(500).send({ message: err.message });
    }
});


app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
})