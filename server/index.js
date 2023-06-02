// IMPORTS FROM PACKAGES
const express = require('express');
const mongoose = require('mongoose');

// IMPORTS FROM OTHER FILES
const authRouter = require('./routes/auth');
const e = require('express');

// INIT

const PORT = 3000;
const app = express();
const DB = "mongodb+srv://oltimaloku555:CWPvdaml2lySzWZ7@cluster0.sl0j7ph.mongodb.net/?retryWrites=true&w=majority"

// middleware
// CLIENT -> middleware -> SERVER -> CLIENT
app.use(express.json());
app.use(authRouter);

// CONNECTIONS
mongoose.connect(DB)
.then(() => {
    console.log("Connection Successful")
})
.catch((e) => {
    console.log(e);
});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at port ${PORT}`);
});