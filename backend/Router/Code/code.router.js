const express = require('express');
const router = express.Router();
const Code = require("../../models/code.model");
const bodyParser = require("body-parser");
const isLogged = require("../../islogged");
router.use(bodyParser.json());
// const newUser = new User({
//     username: "Kartikd23",
//     password: "123456",
//     email: "123@gmail.com",
//     isTeacher: false
// })
// newUser.save().then(()=>{
//     console.log("Successfully saved user");
// }).catch((err) => {
//     console.log(err);
// })

router.get("/saved-codes", (req,res) => {
    const id = req.body.userId;
    Code.find({id})
    .then(codes => {
        res.json(codes);
    })
    .catch(err => {res.status(500).json("Error: "+err)});
});

router.post("/", (req,res) => {
    const {userId, code, filename, language} = req.body;
    const newCode = new Code({
        userId : userId,
        code : code,
        filename : filename,
        language : language
    });
    newCode.save().then(() => {
        res.status(200).json({Status : "Success", Message: "Successfully stored"});
    }).catch((err) => {
        res.status(401).json({err: err});
    })

})

module.exports = router;