const app = require('./app');
const connection = require('./connectionDB')
const dotenv = require('dotenv');

dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`app is runnung on port: ${process.env.PORT}`)
})

