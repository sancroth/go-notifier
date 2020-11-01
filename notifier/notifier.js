const express = require("express");
const bodyParser = require("body-parser");
const notifier = require("node-notifier");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

app.get("/health", (req , res) => {
    res.status(200).send()
})

app.post("/notify",(req, res) => {
    notify(req.body, reply => {
        res.send(reply)
    })
})

const notify = ({title,message}, cb) =>{
    notifier.notify(
        {
            title: title || "Uknown title",
            message: message || "Uknown message",
            sound: true,
            wait: true,
            reply: true,
            icon: path.join(__dirname,"img.png"),
            closeLabel:"Completed?",
            timeout: 15
        },
        (err, resp ,reply)=>{
            cb(reply)
        })
}

app.listen(port, () => console.log(`server up and running on ${port}`))