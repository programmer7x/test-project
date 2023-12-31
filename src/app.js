const { join } = require('node:path');
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./components/users/routes/userRouter');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const globalErrorHandler = require('./utils/globalErrorHandler');
const authRouter = require('./components/users/routes/authRouter');
const productRouter = require('./components/products/routes/producRouter')
const categoryRouter = require('./components/categories/routes/categoryRouter');


const app = express();

app.use(bodyParser.json());
app.use(cookieParser())

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, './public/index.html'));
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter)


app.all('*', (req,res,next) => {
    res.status(404).json({
        status: 'fail',
        message: 'can\'t reach to this URL'
    })
})

app.use(globalErrorHandler);

module.exports = app;