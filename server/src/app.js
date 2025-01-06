const { createApp } = require("./createApp.js") ;
const connectToDb = require("./utils/connectTodb.js");


const app = createApp();

app.listen(3000,() => {
    console.log("server is running on port 3000")
    connectToDb()
});