const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const UserModel = require('./models/UserModel')
const PostModel = require('./models/PostModel')


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

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;  // Ensure you have cookie-parser middleware enabled
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) {
            return res.status(401).send({ auth: false, message: 'Failed to authenticate' });
        }

        // Store user info from token in the request object
        req.email = decoded.email;
        req.username = decoded.username;
        next();
    });
};

app.get('/', verifyUser, (req, res) => {
    return res.send({email: req.email, username: req.username})
})

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

app.post('/login', async (req, res) => {
    try {
        // Check if user exists
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        } else {
            // Check if password is correct
            const validPassword = bcrypt.compareSync(req.body.password, user.password);
            if (!validPassword) {
                return res.status(401).send({ message: 'Invalid password' });
            } else {
                // Generate JWT token
                const token = jwt.sign({ email: user.email, username: user.username }, 'secretkey', { expiresIn: '1d' });

                // Set JWT token in cookie
                res.cookie('token', token);
                return res.send({ message: 'Login successful', token: token });
            }
        } 
    } catch (err) {
        // Handle errors 
        return res.status(500).send({ message: err.message });
    }
});

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const upload = multer( {storage: fileStorage});

app.post( '/create', verifyUser, upload.single('image'), (req, res) => {
    PostModel.create({
        title: req.body.title,
        description: req.body.description,
        image: req.file.path
    })
    return res.send({ message: 'Post created successfully' });
  
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Logout successful' });
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
})