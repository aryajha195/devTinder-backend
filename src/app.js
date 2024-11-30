const express = require('express');

const app = express();

app.get("/user", (req, res) => {
    res.send({
        firstName: "Arya",
        lastName: "Jha"
    })
})

app.post("/user", (req, res) => {
    res.send("User Saved Successfully!")
})

app.delete("/user", (req, res) => {
    res.send("User Deleted Successfully!")
})

app.use("/",(req, res) => {
    res.send("Hello from the server")
})



app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...")
});