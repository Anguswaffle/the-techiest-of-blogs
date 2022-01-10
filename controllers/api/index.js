const rotuer = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const { Router } = require('express');

Router.use('/users', userRoutes)
Router.use('/posts', postRoutes)
Router.use('/comments', commentRoutes)