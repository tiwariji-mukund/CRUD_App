const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1/crud_db", { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost/crud_db');
// mongoose.set("strictQuery", false);

const db = mongoose.connection;
// error
db.on('error', console.error.bind(console, 'error connecting to db'));
// up and running then message
db.once('open', function () {
    console.log('successfully connected to the database')
})