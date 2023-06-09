const express=require('express');
const chat=require('./data/data.js');
const dotenv=require('dotenv');
const connectDB=require("./config/db");
const userRoutes=require("./routes/UserRoutes");
const { errorHandler,notFound } = require('./middleware/errorMiddleware.js');


const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.get("/", (req,res) =>
{
    res.send("APi is running");
})

app.use('/api/user',userRoutes)
// app.get("/api/chat", (req,res) =>{
//     res.send(chat)
// })
// app.get("/api/chat/:id", (req,res) =>{
//     // console.log(req.params.id);
//     // const singleChat=chats.find((c)=>c._id===req.params.id);
//     const singleChat = chat.chats.find((c)=>c._id===req.params.id)
//     res.send(singleChat)
// })

app.use(notFound);
app.use(errorHandler);
const PORT=process.env.PORT||5000
app.listen(PORT,console.log(`server at ${PORT} started`)); 