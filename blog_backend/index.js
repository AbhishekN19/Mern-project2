const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;
const authRoutes = require('./Routes/Auth');
const blogRoutes = require('./Routes/Blog');

require('dotenv').config();
require('./db');
const imageuploadRoutes = require('./Routes/imageUploadRoutes');
const User = require('./Models/UserSchema');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
const allowedOrigins = ['https://localhost:3000'];

app.use(
    cors({
        origin: function (origin, callback) {
            if(!origin || allowedOrigins.includes(origin)) {
                callback(null,true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
)


app.use(cookieParser());

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',authRoutes);
app.use('/blog',blogRoutes);
app.use('/image',imageuploadRoutes);


app.get('/', (req,res) => {
    res.json({message: 'The API is working'});
});

app.get('/blogcategories', async(req,res) => {

    const blogcategories = [
        "Technology Trends",
        "Health and Wellness",
        "Travel Destinations",
        "Gaming and Entertainment",
        "Personal Finance",
        "Career Development",
        "Parenting Tips",
        "Self-Improvement",
        "Home Decor and DIY",
        "Book Reviews"
    ];
    res.json(
        {
            message: " Categories fetched successfully",
            categories: blogcategories
        }
    )
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});