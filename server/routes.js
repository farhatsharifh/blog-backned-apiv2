import express from 'express';
// controller imports
import basicController from './controllers/basicController';
import userController from './controllers/userController';
import postController from './controllers/postController';
import commentController from './controllers/commentController';

const routes = express();

// basic routes
routes.get('/', basicController.get);

// user routes
routes.post('/signup', userController.signup);
routes.post('/login', userController.authenticate);

// post routes
routes.post('/post', postController.post);
// routes.get('/post/:creatorid', postController.post);
routes.get('/posts', postController.getAll);
routes.get('/post/:id', postController.getSinglePost);


// comment routes
routes.post('/comment', commentController.post);

export default routes;