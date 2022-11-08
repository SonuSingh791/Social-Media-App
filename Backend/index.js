import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './Routers/authRouter.js';
import userRouter from './Routers/userRouter.js';
import postRouter from './Routers/postRouter.js';
import uploadRouter from './Routers/uploadRouter.js';
import chatRouter from './Routers/chatRouter.js';
import messageRouter from './Routers/messageRouter.js';
import cors from 'cors';
dotenv.config();
const app = express();

// to serve images for public
app.use(express.static('public'));
app.use('/images', express.static('images'));
// bodyParser.json() a middleware fun used to convert json data which comes from fron-end  to JSO
app.use(bodyParser.json({limit: "30mb", extended: true})); // Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));   // Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(cors());
mongoose.connect(process.env.db_link, {useNewUrlParser: true, useUnifiedTopology: true}).then((db) => {
    console.log("DB Connection Successfully");
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server listening at PORT", process.env.PORT);
    });
}).catch((err) => {
    console.log(err);
});

// index.js -----------------------> Routes ------------------------------------> Controller
// (starting point of app)         (authRouter, userRouter, postRouter)         (authController, userController, postController)


app.use('/auth', authRouter);   // base url 
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/upload', uploadRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);