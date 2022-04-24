require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');


//connecting to db
mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to DB")
}).catch((err) => { console.log(err) })


//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());
app.use(cors());

//routes

app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', categoryRouter)

//PORT
port = 8000 || process.env.PORT;






//listening port
app.listen(port, () => {
    console.log(`listening to port 8000`)
})
