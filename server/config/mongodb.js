const mongoose = require('mongoose');

const connectMongo = async () => { 
    await mongoose.connect(process.env.MONGO)
    .then(() => console.log('mongo connected'))
    .catch((err) => console.log('mongo not connected', err)) 
}

module.exports = connectMongo;

