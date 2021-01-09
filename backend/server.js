import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
const app= express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});



app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res)=>{
    res.send('Server is ready');
});
//middleware/error catcher
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });
const port= process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log(`serve at http://localhost:${port}`);
});