const express = require('express');
const router = express.Router();
const Blog = require('../Models/BlogSchema');
const User = require ('../Models/UserSchema');
const authTokenHandler = require('../Middlewares/checkAuthToken');
const jwt = require('jsonwebtoken');

